# Namuna Gyawali · personal website

Static, zero-build site: `index.html` (all styles and scripts inline), `img/`, and `posts/` (redirects from the old guide URLs to the new in-page guides).

- Contact form sends through FormSubmit to Namuna's email. The first message triggers a one-time activation email she must confirm.
- Videos open in TikTok / Facebook's own embedded players.
- The won ⇄ rupee calculator loads a live mid-market rate from open.er-api.com and falls back to a stored rate.

Deploy: Vercel project `shreedevi-portfolio` (no build step, output = repo root).
