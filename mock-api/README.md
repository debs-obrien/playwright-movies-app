# TMDB Mock API

Hono mock of the TMDB API used by the Playwright Movies App. No Azure required.

- **Local / Playwright**: Node server via `@hono/node-server` (`npm run dev` / `npm start`)
- **Production (GitHub Pages)**: Cloudflare Workers (`npm run deploy`)

## Local

```bash
npm install
npm run build
npm start
```

Listens on `http://localhost:4000` (or `PORT`).

Local cookies stay `SameSite=Lax` (not Secure) so Playwright and HTTP `127.0.0.1` work.

Optional Workers-shaped local preview (separate from the Node server Playwright uses):

```bash
npm run dev:worker
```

## Regenerating fixtures (optional)

Fixtures in `src/*.json` are committed so the mock runs offline. To refresh from live TMDB:

```bash
# Either the classic API Key (v3) or the API Read Access Token (v4) works:
export TMDB_API_KEY=your_v3_api_key
# or: export TMDB_API_READ_ACCESS_TOKEN=your_v4_read_access_token
npm run fetch-data
npm run build
```

Get keys at https://www.themoviedb.org/settings/api (free account required).

## Deploy (Cloudflare Workers)

Current production URL: `https://playwright-tmdb-mock.zephyrwmf.workers.dev`

```bash
# once (interactive browser login)
npx wrangler login

cd mock-api
npm run deploy
```

Then:

1. Keep [`.github/workflows/nextjs.yml`](../.github/workflows/nextjs.yml) pointed at the Workers URL (or set repo variable `NEXT_PUBLIC_TMDB_API_BASE_URL`).
2. For CI deploys, add repo secrets `CLOUDFLARE_API_TOKEN` (Workers Edit) and optionally `CLOUDFLARE_ACCOUNT_ID`, then use the **Deploy mock API** GitHub Action.

Production sets `COOKIE_SECURE=true` / `NODE_ENV=production` in `wrangler.jsonc`, which enables `Secure; SameSite=None` cookies for cross-site use from GitHub Pages.

### Notes

- List state is in-memory per Worker isolate. Cold starts reset lists — fine for this learning app.
- `Dockerfile` / `fly.toml` remain only as optional leftovers; production hosting is Workers.
