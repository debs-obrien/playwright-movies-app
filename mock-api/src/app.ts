import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { create, search, insertMultiple } from "@orama/orama"

import * as fastShuffle from "fast-shuffle"
import configuration from "./configuration.json" with { type: "json" }
import genreList from "./genre-list.json" with { type: "json" }
import persons from "./persons.json" with { type: "json" }
import movies from "./movies.json" with { type: "json" }
import enrichedMovies from "./enriched-movies.json" with { type: "json" }
import { CookieOptions } from 'hono/utils/cookie'

// Cookie policy:
// - Local HTTP (127.0.0.1 app + API, different ports = same-site): Lax, not Secure
//   so Playwright's APIRequestContext can round-trip cookies.
// - Production HTTPS (Workers + GitHub Pages, cross-site): Secure + SameSite=None
//   Set via wrangler.jsonc vars (COOKIE_SECURE / NODE_ENV) on Workers.
const useSecureCrossSiteCookies =
  process.env.COOKIE_SECURE === 'true' ||
  process.env.NODE_ENV === 'production'
const cookieSettings: CookieOptions = {
  httpOnly: true,
  secure: useSecureCrossSiteCookies,
  sameSite: useSecureCrossSiteCookies ? 'None' : 'Lax',
  path: '/',
}

type List = {
  id?: string
  created_by: { id: string }
  movies: string[]
  name?: string
  description?: string
  public?: boolean
}

// In-memory list store so API clients (Playwright request) keep working even when
// Secure cookie round-trips are flaky. Cookies remain for browser sessions.
const listStore = new Map<string, List>()
const accountListIds = new Map<string, Set<string>>()

const dedupedMovies = enrichedMovies.filter((movie, index) => enrichedMovies.findIndex(m => m.id === movie.id) === index)

// Lazy-init Orama: insertMultiple uses setTimeout, which Workers disallow at global scope.
type SearchIndex = Awaited<ReturnType<typeof create>>
let searchIndexPromise: Promise<SearchIndex> | null = null
function getSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = (async () => {
      const index = await create({
        schema: {
          adult: "boolean",
          id: "string",
          original_language: "enum",
          original_title: "string",
          overview: "string",
          popularity: "number",
          release_date: "string",
          title: "string",
          video: "boolean",
          vote_average: "number",
          vote_count: "number",
          budget: "number",
          homepage: "string",
          imdb_id: "string",
          origin_country: "enum[]",
          revenue: "number",
          runtime: "number",
          status: "enum",
          tagline: "string",
        }
      })
      await insertMultiple(index, dedupedMovies.map(movie => ({ ...movie, id: movie.imdb_id })) as any)
      return index
    })()
  }
  return searchIndexPromise
}

function isAllowedOrigin(origin: string): boolean {
  if (origin === 'https://debs-obrien.github.io') return true
  try {
    const url = new URL(origin)
    return (
      url.protocol === 'http:' &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1')
    )
  } catch {
    return false
  }
}

/** Test-only reset of in-memory list state. Disabled on Workers/production. */
function isTestResetEnabled(): boolean {
  if (process.env.ALLOW_TEST_RESET === 'true') return true
  if (process.env.ALLOW_TEST_RESET === 'false') return false
  return (
    process.env.COOKIE_SECURE !== 'true' &&
    process.env.NODE_ENV !== 'production'
  )
}

export const app = new Hono()
app.use('*', cors({
  origin: (origin) => (origin && isAllowedOrigin(origin) ? origin : undefined),
  credentials: true,
}))

app.post('/test/reset', (c) => {
  if (!isTestResetEnabled()) {
    return c.text('not found', { status: 404 })
  }
  listStore.clear()
  accountListIds.clear()
  return c.json({ success: true })
})

app.post("/4/auth/request_token", async (c) => {
  const { redirect_to } = await c.req.json()
  return c.json({
    success: true,
    status_code: 1,
    status_message: "Success.",
    request_token: Buffer.from(JSON.stringify({ redirect_to })).toString("base64"),
  })
})
app.get("/auth/access", async (c) => {
  return c.html(`
    <!--
// v0 by Vercel.
// https://v0.dev/t/boP1S5LAB4n
-->

<script src="https://cdn.tailwindcss.com"></script>
<style>:root{--background:0 0% 100%;--foreground:240 10% 3.9%;--card:0 0% 100%;--card-foreground:240 10% 3.9%;--popover:0 0% 100%;--popover-foreground:240 10% 3.9%;--primary:240 5.9% 10%;--primary-foreground:0 0% 98%;--secondary:240 4.8% 95.9%;--secondary-foreground:240 5.9% 10%;--muted:240 4.8% 95.9%;--muted-foreground:240 3.8% 45%;--accent:240 4.8% 95.9%;--accent-foreground:240 5.9% 10%;--destructive:0 72% 51%;--destructive-foreground:0 0% 98%;--border:240 5.9% 90%;--input:240 5.9% 90%;--ring:240 5.9% 10%;--chart-1:173 58% 39%;--chart-2:12 76% 61%;--chart-3:197 37% 24%;--chart-4:43 74% 66%;--chart-5:27 87% 67%;--radius:0.5rem;}img[src="/placeholder.svg"],img[src="/placeholder-user.jpg"]{filter:sepia(.3) hue-rotate(-60deg) saturate(.5) opacity(0.8) }</style>
<style>h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; --font-sans-serif: 'Inter'; }
</style>
<style>body { font-family: 'Inter', sans-serif; --font-sans-serif: 'Inter'; }
</style>
<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A2B34] to-[#2C4452] px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <div class="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-12 w-12 text-white"
        >
          <polygon points="6 3 20 12 6 21 6 3"></polygon>
        </svg>
        <h2 class="text-center text-3xl font-bold tracking-tight text-white">Login to the Playwright Stage</h2>
      </div>
    </div>
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label
          class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-white"
          for="email"
        >
          Email address
        </label>
        <div class="mt-1">
          <input
            class="h-10 border text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 bg-[#1A2B34] px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            id="email"
            autocomplete="email"
            required=""
            placeholder="you@example.com"
            type="email"
            name="email"
          />
        </div>
      </div>
      <div>
        <label
          class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-white"
          for="password"
        >
          Password
        </label>
        <div class="mt-1">
          <input
            class="h-10 border text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 bg-[#1A2B34] px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            id="password"
            autocomplete="current-password"
            required=""
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 font-medium text-white bg-[#4a5568] rounded-md hover:bg-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#4a5568]"
      >
        Login
      </button>
    </form>
  </div>
</div>
  `)
})
app.post("/auth/access", async (c) => {
  const request_token = c.req.query("request_token")
  const form = await c.req.formData()
  const email = form.get("email") as string
  const { redirect_to } = JSON.parse(Buffer.from(request_token, "base64").toString())
  const account_id = encodeURIComponent(email);
  const access_token = Buffer.from(JSON.stringify({ account_id })).toString("base64")
  setCookie(c, request_token.slice(0, 6), access_token, cookieSettings);
  setCookie(c, "current_account", account_id, cookieSettings);
  return c.redirect(redirect_to)
})
app.post("/4/auth/access_token", async (c) => {
  const { request_token } = await c.req.json()
  const access_token = getCookie(c, request_token.slice(0, 6));
  if (!access_token) return c.text("unauthenticated", { status: 401 })
  const { account_id } = JSON.parse(Buffer.from(access_token, "base64").toString())

  return c.json({
    success: true,
    status_code: 1,
    status_message: "Success.",
    access_token,
    account_id,
  })
})
app.delete("/4/auth/access_token", async (c) => {
  // no-op
  return c.json({ success: true });
})

type State = {}

/** Cookie-safe name derived from account id (emails / %40 are invalid cookie names). */
function accountStateCookieName(accountId: string): string {
  return 'acct_' + Buffer.from(accountId).toString('base64url')
}

function editState(c: Context, accountId: string | undefined, fn: (state: State) => void) {
  if (!accountId) accountId = getCookie(c, "current_account")
  if (!accountId) return
  const cookieName = accountStateCookieName(accountId)
  const stateCookie = getCookie(c, cookieName)
  const state: State = stateCookie ? JSON.parse(Buffer.from(stateCookie, "base64").toString()) : {}
  fn(state)
  setCookie(c, cookieName, Buffer.from(JSON.stringify(state)).toString("base64"), cookieSettings)
}

function accountIdFromAuthHeader(c: Context): string {
  const header = c.req.header('authorization') || ''
  const token = header.replace(/^Bearer\s+/i, '').trim()
  if (!token) return ''
  try {
    const parsed = JSON.parse(Buffer.from(token, 'base64').toString())
    return parsed.account_id || ''
  } catch {
    return ''
  }
}

function resolveAccountId(c: Context, accountId?: string) {
  return accountId || getCookie(c, "current_account") || accountIdFromAuthHeader(c) || ""
}

function editList(c: Context, listId: string, fn: (list: List) => void, accountId?: string): List {
  const resolvedAccountId = resolveAccountId(c, accountId)
  const cookieName = listId
  const listCookie = getCookie(c, cookieName)
  const list: List = listStore.get(listId)
    || (listCookie ? JSON.parse(Buffer.from(listCookie, "base64").toString()) : {
      id: listId,
      movies: [],
      created_by: { id: resolvedAccountId },
    })
  if (!list.id) list.id = listId
  if (!list.created_by?.id && resolvedAccountId) list.created_by = { id: resolvedAccountId }
  fn(list)
  listStore.set(listId, list)
  if (list.created_by?.id) {
    const ids = accountListIds.get(list.created_by.id) || new Set<string>()
    ids.add(listId)
    accountListIds.set(list.created_by.id, ids)
  }
  setCookie(c, cookieName, Buffer.from(JSON.stringify(list)).toString("base64"), cookieSettings)
  return list
}

app.get("/4/account/:accountId/lists", async (c) => {
  const accountId = c.req.param("accountId")
  let decoded = accountId
  try { decoded = decodeURIComponent(accountId) } catch { /* keep raw */ }
  const candidates = new Set([
    accountId,
    decoded,
    encodeURIComponent(accountId),
    encodeURIComponent(decoded),
  ])
  const results = [...listStore.values()].filter((list) =>
    candidates.has(list.created_by?.id || '')
  )
  return c.json(paginate(results, 1, results.length));
})

app.post("/4/list", async (c) => {
  const id = crypto.randomUUID()
  const newList = await c.req.json()
  editList(c, id, list => {
    Object.assign(list, newList)
  })
  return c.json({ id });
})

function listToResult(list: List) {
  const results = list.movies.map((movieId: any) => enrichedMovies.find((movie: any) => movie.imdb_id === movieId))
  return {
    ...list,
    ...paginate(results, 1, results.length),
  }
}
app.get("/4/list/:listId", async (c) => {
  const listId = c.req.param("listId")
  const list = editList(c, listId, () => { })
  return c.json(listToResult(list));
})
app.put("/4/list/:listId", async (c) => {
  const listId = c.req.param("listId")
  const newList = await c.req.json()
  editList(c, listId, list => {
    Object.assign(list, newList)
  })
  return c.text("ok");
})
app.post("/4/list/:listId/items", async (c) => {
  const listId = c.req.param("listId")
  const { items } = await c.req.json()
  editList(c, listId, list => {
    for (const { media_id } of items) {
      if (!list.movies.includes(media_id)) list.movies.push(media_id)
    }
  })
  return c.text("ok");
})
app.delete("/4/list/:listId/items", async (c) => {
  const listId = c.req.param("listId")
  const { items } = await c.req.json()

  const movieIdsToDelete = items.map(({ media_id }) => media_id)
  const moviesToDelete = enrichedMovies.filter((movie) => movieIdsToDelete.includes(movie.imdb_id))
  editList(c, listId, list => {
    for (const { imdb_id } of moviesToDelete) {
      const index = list.movies.indexOf(imdb_id)
      if (index !== -1) list.movies.splice(index, 1)
    }
  })
  return c.text("ok");
})
app.delete("/4/list/:listId", async (c) => {
  const listId = c.req.param("listId")
  const existing = listStore.get(listId)
  if (existing?.created_by?.id) {
    accountListIds.get(existing.created_by.id)?.delete(listId)
  }
  listStore.delete(listId)
  deleteCookie(c, listId, cookieSettings)
  return c.text("ok");
})

function paginate(array: any[], page: number, page_size: number = 20) {
  const total_results = array.length
  const total_pages = Math.ceil(total_results / page_size)

  return {
    results: array.slice((page - 1) * page_size, page * page_size),
    page,
    total_pages,
    total_results,
  }
}

app.use(async (c, next) => {
  await next()
  c.res.headers.append("CDN-Cache-Control", "max-age=31536000")
})

app.get("/", (c) => c.text("ok"))
app.get("/3/configuration", (c) => c.json(configuration))
app.get("/3/genre/movie/list", (c) => c.json(genreList))

function discoverMovies({ page = "1", sort_by = "popularity.desc", with_cast, with_genres }: { page?: string, with_genres?: string, with_cast?: string, sort_by?: string }) {
  let results = [...movies];
  if (with_genres)
    results = results.filter((movie: any) => movie.genre_ids.includes(parseInt(with_genres)))
  if (with_cast) {
    const ids = enrichedMovies.filter((movie: any) => movie.credits.cast.find((cast: any) => cast.id === parseInt(with_cast))).map((movie: any) => movie.id)
    results = results.filter((movie: any) => ids.includes(movie.id))
  }

  const [field, order] = sort_by.split(".")
  results.sort((a: any, b: any) => b[field] > a[field] ? 1 : -1)
  if (order === "asc") results.reverse()

  return paginate(results, parseInt(page))
}

app.get("/3/discover/movie", (c) => c.json(discoverMovies(c.req.query())))
app.get("/3/movie/top_rated", (c) => c.json(discoverMovies({ ...c.req.query(), sort_by: "vote_average.desc" })))
app.get("/3/movie/popular", (c) => c.json(discoverMovies({ ...c.req.query(), sort_by: "popularity.desc" })))
app.get("/3/movie/upcoming", (c) => c.json(discoverMovies({ ...c.req.query(), sort_by: "release_date.desc" })))

function findMovie(id: string) {
  return enrichedMovies.find((movie: any) => movie.id === parseInt(id) || movie.imdb_id === id)
}
app.get("/3/movie/:movie", (c) => {
  return c.json(findMovie(c.req.param("movie")));
})
app.get("/3/movie/:movie/credits", (c) => {
  return c.json(findMovie(c.req.param("movie"))?.credits);
})
app.get("/3/movie/:movie/recommendations", (c) => {
  const page = c.req.query("page") ?? "1";
  const movie = c.req.param("movie");
  const numericId = Number.parseInt(movie, 10);
  const seed = Number.isFinite(numericId)
    ? numericId
    : [...movie].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const recommendations = fastShuffle.createShuffle(seed)(enrichedMovies);
  return c.json(paginate(recommendations, parseInt(page)));
})

app.get("/3/person/:person", (c) => {
  const person = c.req.param("person");
  return c.json(persons[person])
})

app.get("/3/search/movie", async (c) => {
  const { query, page: pageStr = "1" } = c.req.query()
  const page = parseInt(pageStr)
  const searchIndex = await getSearchIndex()
  const results = await search(searchIndex as any, {
    term: query,
    offset: (page - 1) * 20,
    limit: 20,
  })
  return c.json({
    page,
    results: results.hits.map((hit: any) => hit.document),
    total_results: results.count,
    total_pages: Math.ceil(results.count / 20),
  })
})

app.notFound((c) => {
  return c.text("not found", { status: 404 })
})
