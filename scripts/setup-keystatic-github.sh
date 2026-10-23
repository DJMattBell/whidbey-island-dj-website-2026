#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# Keystatic GitHub Mode Setup Wizard
#
# Run once to connect Keystatic to GitHub so content editors can
# manage the site through /keystatic on the live Vercel deployment.
#
# Usage:  bash scripts/setup-keystatic-github.sh
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── Formatting helpers ────────────────────────────────────────────────
BOLD=$'\033[1m'  DIM=$'\033[2m'  RESET=$'\033[0m'
GREEN=$'\033[0;32m'  YELLOW=$'\033[1;33m'  RED=$'\033[0;31m'  CYAN=$'\033[0;36m'

step()  { printf "\n%s\n\n" "${CYAN}${BOLD}━━━ Step $1: $2 ━━━${RESET}"; }
ok()    { printf "%s %s\n" "${GREEN}✓${RESET}" "$1"; }
warn()  { printf "%s %s\n" "${YELLOW}!${RESET}" "$1"; }
fail()  { printf "%s %s\n" "${RED}✗${RESET}" "$1"; }
prompt(){ printf "%s " "${BOLD}$1${RESET}"; }
hr()    { printf "%s\n" "${DIM}──────────────────────────────────────────────────${RESET}"; }

pause() {
  echo ""
  read -rp "  Press Enter when done... "
  echo ""
}

open_url() {
  local url="$1"
  echo "  ${DIM}${url}${RESET}"
  if command -v open &>/dev/null; then
    open "$url" 2>/dev/null || true
  elif command -v xdg-open &>/dev/null; then
    xdg-open "$url" 2>/dev/null || true
  fi
}

REPO="DJMattBell/whidbey-island-dj-website-2026"

# ── Step 0: Pre-flight ────────────────────────────────────────────────
step 0 "Pre-flight checks"

if ! command -v openssl &>/dev/null; then
  fail "openssl not found — install it first"
  exit 1
fi
ok "openssl available"

if command -v open &>/dev/null || command -v xdg-open &>/dev/null; then
  ok "URL opener available (URLs will open in your browser)"
else
  warn "No 'open' command — copy/paste the URLs shown below"
fi

echo ""
echo "This wizard connects Keystatic to GitHub so you can edit content"
echo "at ${BOLD}/keystatic${RESET} on your live site."
echo ""
echo "You'll need access to:"
echo "  • GitHub account that owns ${BOLD}${REPO}${RESET}"
echo "  • Vercel dashboard for this project"
echo ""
prompt "What is the Vercel deployment URL? (e.g. widc.vercel.app or whidbeyislanddj.com)"
read -r SITE_URL

# Strip trailing slash and ensure https://
SITE_URL="${SITE_URL%/}"
[[ "$SITE_URL" != https://* ]] && SITE_URL="https://${SITE_URL}"

ok "Target: ${SITE_URL}"

# ── Step 1: Create the GitHub App ─────────────────────────────────────
step 1 "Create a GitHub App"

echo "Keystatic authenticates editors via a GitHub App you own."
echo ""
echo "Open GitHub and create a new app with these settings:"
echo ""
hr
echo "  ${BOLD}App name${RESET}             WIDC Keystatic ${DIM}(or any name you like)${RESET}"
echo "  ${BOLD}Homepage URL${RESET}         ${SITE_URL}"
echo ""
echo "  ${BOLD}Callback URLs${RESET}  (add both):"
echo "    ${SITE_URL}/keystatic/api/github/oauth/callback"
echo "    http://localhost:4321/keystatic/api/github/oauth/callback"
echo ""
echo "  ${BOLD}Expire user tokens${RESET}   ☐ unchecked"
echo "  ${BOLD}Request user auth on install${RESET}  ☐ unchecked"
echo "  ${BOLD}Webhook Active${RESET}       ☐ unchecked"
echo ""
echo "  ${BOLD}Repository permissions${RESET}:"
echo "    Contents    → Read and write"
echo "    Metadata    → Read-only"
echo ""
echo "  ${BOLD}Where can this app be installed?${RESET}"
echo "    ● Only on this account"
hr
echo ""
echo "Opening GitHub → Settings → Developer settings → New GitHub App..."
open_url "https://github.com/settings/apps/new"
pause

# ── Step 2: Collect credentials ───────────────────────────────────────
step 2 "Collect credentials from the new app"

echo "After creating the app, GitHub shows the app settings page."
echo "You need three values from it."
echo ""

prompt "2a. Client ID (shown near the top of the page):"
read -r CLIENT_ID
echo ""

echo "Now generate a client secret — click ${BOLD}'Generate a new client secret'${RESET}."
echo "${YELLOW}Copy it immediately; GitHub only shows it once.${RESET}"
echo ""
prompt "2b. Client Secret:"
read -r CLIENT_SECRET
echo ""

echo "The app slug is in the URL of the settings page:"
echo "  github.com/settings/apps/${BOLD}<this-part>${RESET}"
echo ""
prompt "2c. App slug:"
read -r APP_SLUG
echo ""

ok "Credentials collected"

# ── Step 3: Install the app on the repo ───────────────────────────────
step 3 "Install the app on ${REPO}"

echo "The app needs to be installed on the repo to commit content."
echo ""
echo "Opening the app's install page..."
open_url "https://github.com/apps/${APP_SLUG}/installations/new"
echo ""
echo "Select ${BOLD}Only select repositories${RESET} → pick ${BOLD}${REPO}${RESET} → Install."
pause
ok "App installed"

# ── Step 4: Generate KEYSTATIC_SECRET ─────────────────────────────────
step 4 "Generate session secret"

KEYSTATIC_SECRET=$(openssl rand -hex 32)
ok "Generated KEYSTATIC_SECRET"

# ── Step 5: Set env vars in Vercel ────────────────────────────────────
step 5 "Set environment variables in Vercel"

echo "Open the project's Environment Variables page in Vercel:"
open_url "https://vercel.com"
echo ""
echo "Navigate to: Your project → Settings → Environment Variables"
echo ""
echo "Add these ${BOLD}four${RESET} variables. Set each to ${BOLD}Production${RESET} (and Preview if you want)."
echo ""
hr
printf "  %-38s %s\n" "${BOLD}Variable${RESET}" "${BOLD}Value${RESET}"
hr
printf "  %-38s %s\n" "KEYSTATIC_GITHUB_CLIENT_ID" "$CLIENT_ID"
printf "  %-38s %s\n" "KEYSTATIC_GITHUB_CLIENT_SECRET" "$CLIENT_SECRET"
printf "  %-38s %s\n" "KEYSTATIC_SECRET" "$KEYSTATIC_SECRET"
printf "  %-38s %s\n" "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG" "$APP_SLUG"
hr
echo ""
echo "${DIM}Tip: triple-click to select each value, or copy from the table above.${RESET}"
echo ""
echo "Here are the raw values for easy copying:"
echo ""
echo "  ${CLIENT_ID}"
echo "  ${CLIENT_SECRET}"
echo "  ${KEYSTATIC_SECRET}"
echo "  ${APP_SLUG}"
pause
ok "Env vars set"

# ── Step 6: Redeploy ─────────────────────────────────────────────────
step 6 "Trigger a redeploy"

echo "Vercel needs a fresh deploy to pick up the new env vars."
echo ""
echo "Easiest way: in the Vercel dashboard, go to"
echo "  Deployments → click ${BOLD}...${RESET} on the latest → ${BOLD}Redeploy${RESET}"
echo ""
echo "Or push an empty commit:"
echo "  ${DIM}git commit --allow-empty -m 'chore: redeploy for Keystatic GitHub mode'${RESET}"
echo "  ${DIM}git push origin main${RESET}"
echo ""
echo "Wait for the build to finish before continuing."
pause

# ── Step 7: Verify ────────────────────────────────────────────────────
step 7 "Verify Keystatic works"

echo "Opening Keystatic on your live site..."
open_url "${SITE_URL}/keystatic"
echo ""
echo "Test the full flow:"
echo "  1. Click ${BOLD}Sign in with GitHub${RESET}"
echo "  2. Authorize the app when prompted"
echo "  3. You should see the Keystatic dashboard with all collections"
echo "  4. Open ${BOLD}Reviews${RESET} → pick any review → make a tiny edit → ${BOLD}Save${RESET}"
echo "  5. Check GitHub: a new commit should appear on main"
echo "  6. Check Vercel: a new deploy should start automatically"
echo ""
prompt "Did the full flow work? (y/n)"
read -r works

echo ""
if [[ "$works" == "y" ]]; then
  printf "%s\n" "${GREEN}${BOLD}━━━ Keystatic GitHub mode is live! ━━━${RESET}"
  echo ""
  echo "Content editors can now visit ${SITE_URL}/keystatic"
  echo "to add reviews, gallery photos, blog posts, and more."
  echo ""
  echo "Next steps (see BUILD_PLAN.md → Content Track):"
  echo "  • Add gallery photos and video URLs"
  echo "  • Add equipment entries"
  echo "  • Upload DJ headshots"
  echo "  • Fill in review badges and proof numbers"
  echo ""
  echo "This script can be deleted — it's a one-time setup."
else
  printf "%s\n" "${RED}${BOLD}━━━ Troubleshooting ━━━${RESET}"
  echo ""
  echo "${BOLD}Callback URL mismatch${RESET}"
  echo "  Check the GitHub App settings → callback URL is exactly:"
  echo "  ${SITE_URL}/keystatic/api/github/oauth/callback"
  echo ""
  echo "${BOLD}Bad credentials / could not verify${RESET}"
  echo "  Double-check KEYSTATIC_GITHUB_CLIENT_ID and"
  echo "  KEYSTATIC_GITHUB_CLIENT_SECRET in Vercel."
  echo "  Use the Client Secret, not a private key."
  echo ""
  echo "${BOLD}Blank page or 404 at /keystatic${RESET}"
  echo "  Deploy may still be in progress — wait and refresh."
  echo "  Check Vercel build logs for errors."
  echo ""
  echo "${BOLD}App not installed / no repo access${RESET}"
  echo "  Visit: https://github.com/apps/${APP_SLUG}/installations/new"
  echo "  Install on: ${REPO}"
  echo ""
  echo "${BOLD}Still stuck?${RESET}"
  echo "  Keystatic docs: https://keystatic.com/docs/github-mode"
fi
