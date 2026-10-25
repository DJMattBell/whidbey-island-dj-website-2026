import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

/** Escape user input for safe interpolation into HTML. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * Basic in-memory rate limiter. Imperfect on serverless (state resets on cold
 * start) but catches the common case of a bot hammering the endpoint.
 */
const submissions = new Map<string, number[]>();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT = 5; // max submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  submissions.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (body: Record<string, unknown>, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  // --- honeypot: a hidden "website" field that humans leave blank ---
  const formData = await request.formData();
  const honeypot = formData.get("website")?.toString();
  if (honeypot) {
    // Bot filled the hidden field — pretend success so it doesn't retry
    return json({ success: true }, 200);
  }

  // --- rate limit ---
  const ip = clientAddress ?? "unknown";
  if (isRateLimited(ip)) {
    return json(
      { error: "Too many submissions. Please try again later." },
      429,
    );
  }

  // --- validate ---
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const event_date = formData.get("event_date")?.toString().trim() || null;
  const event_type = formData.get("event_type")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return json({ error: "Name, email, and message are required." }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  // --- send via Resend ---
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM;
  const to = import.meta.env.RESEND_TO;

  if (!apiKey || !from || !to) {
    console.error("Missing RESEND_API_KEY, RESEND_FROM, or RESEND_TO env var");
    return json({ error: "Something went wrong. Please try again." }, 500);
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const dateLine = event_date
    ? `<p><strong>Event date:</strong> ${escapeHtml(event_date)}</p>`
    : "";
  const typeLine = event_type
    ? `<p><strong>Event type:</strong> ${escapeHtml(event_type)}</p>`
    : "";
  const body = `
    <h2>New inquiry from ${safeName}</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    ${dateLine}
    ${typeLine}
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `.trim();

  const subject = `New inquiry from ${safeName}`;

  try {
    // Send to Matt
    await resend.emails.send({ from, to, subject, html: body });

    // Send confirmation copy to the sender
    await resend.emails.send({
      from,
      to: email,
      subject: "We got your message — WIDC",
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out to the Whidbey Island DJ Collective. We received your message and will get back to you within 24 hours.</p>
        <hr>
        ${body}
      `.trim(),
    });
  } catch (err) {
    console.error("Resend error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }

  return json({ success: true }, 200);
};
