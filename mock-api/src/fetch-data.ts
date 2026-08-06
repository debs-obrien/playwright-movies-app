import pMap from "p-map";
import { writeFile } from "node:fs/promises";
import movies from "./movies.json" with { type: "json" }
import { availableParallelism } from "node:os"

const headers = {
    authorization: `Bearer ${process.env.TMDB_API_KEY}`,
}

const fetchJSON = (path: string) => fetch(path, { headers }).then(resp => resp.json());
const writeJSON = async (path: string, content: any) =>
    await writeFile(path, JSON.stringify(content, null, 2));

await writeJSON("./configuration.json", await fetchJSON("https://api.themoviedb.org/3/configuration"));

const persons = new Set<string>()
const enrichedMovies: any[] = [];
console.log("Movies ", movies.length);
await pMap(movies, async (movie) => {
    const { id } = movie;

    const [fullMovie, credits] = await Promise.all([
        fetchJSON(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`),
        fetchJSON(`https://api.themoviedb.org/3/movie/${id}/credits`),
    ]);

    credits.cast.forEach((person: any) => persons.add(person.id));
    credits.crew.forEach((person: any) => persons.add(person.id));

    enrichedMovies.push({ ...movie, ...fullMovie, credits });
    process.stdout.write(new TextEncoder().encode("."));
}, { concurrency: availableParallelism() })

await writeJSON("./enriched-movies.json", enrichedMovies);

console.log("Persons: ", persons.size);
const personResult = {}
await pMap(persons, async (person: any) => {
    personResult[person] = await fetchJSON(`https://api.themoviedb.org/3/person/${person}`);
    process.stdout.write(new TextEncoder().encode("."));
}, { concurrency: availableParallelism() })

await writeJSON("./persons.json", personResult);
