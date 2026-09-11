# Access Map & Offboarding

_Who holds what, and how to grant or revoke it. Fill in the account owners at Phase 0. Keep this current — it is the first thing a hired developer or site manager needs, and the first thing you need when one leaves._

## Systems

| System                                                             | Purpose                                | Owner account | How others get access                                                     |
| ------------------------------------------------------------------ | -------------------------------------- | ------------- | ------------------------------------------------------------------------- |
| GitHub org `<widc-org>`                                            | Code + content (Keystatic writes here) | Matt          | Org member with write on the repo. Content editors need only this.        |
| Vercel project                                                     | Hosting, build, env vars, analytics    | Matt          | Team member on the Vercel team. Developers only.                          |
| Domain registrar(s)                                                | DNS for all owned domains              | Matt          | Never shared. Matt makes DNS changes; developers request them in writing. |
| Resend                                                             | Outbound inquiry email                 | Matt          | API key lives only in Vercel env vars.                                    |
| Keystatic GitHub App                                               | OAuth for the `/keystatic` admin       | Matt          | Created once at Phase 0; client ID/secret in Vercel env vars.             |
| YouTube channel                                                    | Video hosting                          | Matt          | Editors add videos by URL only; channel access not required.              |
| Review platforms (Knot, WeddingWire, Google, Facebook, Zola, Yelp) | Source of reviews                      | Matt          | Not connected to the site; reviews are copied in manually.                |

## Roles

- **Content editor** (Matt, wife, future site manager): GitHub org member with write on the repo. Edits through `/keystatic`. No Vercel, no registrar.
- **Developer** (future hire): GitHub write + Vercel team member. No registrar, no Resend dashboard, no personal logins.
- **Owner** (Matt): everything above plus registrar and billing.

## Onboarding a developer

1. Invite to GitHub org with write on the repo.
2. Invite to Vercel team.
3. Point them at README.md. Nothing else should be needed.

## Offboarding (target: 20 minutes)

1. Remove from GitHub org.
2. Remove from Vercel team.
3. Rotate: Resend API key, Keystatic app secret, `KEYSTATIC_SECRET`. Update Vercel env vars; redeploy.
4. Confirm no personal access tokens or deploy hooks were created under their name (GitHub → org settings → tokens; Vercel → project → deploy hooks).
5. Note the date here.

## Environment variables

See `.env.example` for the full list with descriptions. Values exist only in Vercel and in local `.env` files that are never committed.
