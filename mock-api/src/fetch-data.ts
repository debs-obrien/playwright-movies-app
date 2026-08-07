import pMap from "p-map";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { availableParallelism } from "node:os";
import movies from "./movies.json" with { type: "json" };

// Accept either:
// - TMDB API Read Access Token (v4 JWT) via TMDB_API_KEY or TMDB_API_READ_ACCESS_TOKEN
// - Classic TMDB API Key (v3) via TMDB_API_KEY
const credential =
  process.env.TMDB_API_READ_ACCESS_TOKEN || process.env.TMDB_API_KEY;

if (!credential) {
  console.error(`Missing TMDB credentials.

Create a free key at https://www.themoviedb.org/settings/api then either:

  export TMDB_API_KEY='your_v3_api_key'
  # or
  export TMDB_API_READ_ACCESS_TOKEN='your_v4_read_access_token'

Then re-run: npm run fetch-data`);
  process.exit(1);
}

// JWT-shaped read access tokens use Bearer auth; short v3 keys use ?api_key=
const isReadAccessToken = credential.startsWith("eyJ");
const headers: HeadersInit = isReadAccessToken
  ? { authorization: `Bearer ${credential}` }
  : {};

// npm run fetch-data runs with cwd=mock-api; fixtures live in src/.
const srcDir = join(process.cwd(), "src");

const withAuth = (url: string) => {
  if (isReadAccessToken) return url;
  const u = new URL(url);
  u.searchParams.set("api_key", credential);
  return u.toString();
};

const fetchJSON = async (path: string) => {
  const resp = await fetch(withAuth(path), { headers });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(`${path} → ${resp.status}: ${JSON.stringify(data)}`);
  }
  return data;
};

const writeJSON = async (filename: string, content: unknown) => {
  await mkdir(srcDir, { recursive: true });
  await writeFile(join(srcDir, filename), JSON.stringify(content, null, 2));
};

console.log(
  `Using TMDB auth: ${isReadAccessToken ? "v4 read access token" : "v3 api_key"}`,
);

await writeJSON(
  "configuration.json",
  await fetchJSON("https://api.themoviedb.org/3/configuration"),
);

const persons = new Set<number>();
const enrichedMovies: any[] = [];
console.log("Movies ", movies.length);
await pMap(
  movies,
  async (movie) => {
    const { id } = movie;

    const [fullMovie, credits] = await Promise.all([
      fetchJSON(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`),
      fetchJSON(`https://api.themoviedb.org/3/movie/${id}/credits`),
    ]);

    for (const person of credits.cast ?? []) persons.add(person.id);
    for (const person of credits.crew ?? []) persons.add(person.id);

    enrichedMovies.push({ ...movie, ...fullMovie, credits });
    process.stdout.write(".");
  },
  { concurrency: availableParallelism() },
);

// Keep catalog order aligned with movies.json
const order = new Map(movies.map((movie, index) => [movie.id, index]));
enrichedMovies.sort(
  (a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0),
);

await writeJSON("enriched-movies.json", enrichedMovies);

console.log("\nPersons: ", persons.size);
const personResult: Record<string, unknown> = {};
await pMap(
  [...persons],
  async (personId) => {
    personResult[String(personId)] = await fetchJSON(
      `https://api.themoviedb.org/3/person/${personId}`,
    );
    process.stdout.write(".");
  },
  { concurrency: availableParallelism() },
);

await writeJSON("persons.json", personResult);
console.log("\nWrote fixtures to", srcDir);
