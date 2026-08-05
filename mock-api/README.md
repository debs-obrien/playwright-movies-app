# TMDB Mock API

Node/Hono mock of the TMDB API used by the Playwright Movies App. No Azure required.

## Local

```bash
npm install
npm run build
npm start
```

Listens on `http://localhost:4000` (or `PORT`).

## Regenerating fixtures (optional)

Fixtures in `src/*.json` are committed so the mock runs offline. To refresh from live TMDB:

```bash
export TMDB_API_KEY=your_read_access_token
npm run fetch-data
npm run build
```

## Deploy (Fly.io)

The GitHub Pages demo expects this mock at `https://playwright-tmdb-mock.fly.dev`.

```bash
# once
fly auth login
fly apps create playwright-tmdb-mock   # if the app does not exist yet

cd mock-api
fly deploy
```

Or set the repo secret `FLY_API_TOKEN` and use the **Deploy mock API** GitHub Action.

Production sets `NODE_ENV=production`, which enables `Secure; SameSite=None` cookies for cross-site use from GitHub Pages.
