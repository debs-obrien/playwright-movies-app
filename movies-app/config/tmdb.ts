// TODO: use an environment variable like process.env.TMDB_API_KEY
const TMDB_API_KEY: string | undefined = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_VERSION: number = 3;
const TMDB_API_NEW_VERSION: number = 4;
const TMDB_API_READ_ACCESS_TOKEN: string = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN || '';

const TMDB_API_BASE_URL: string =
  process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || 'http://127.0.0.1:4000';
const TMDB_BASE_URL: string = 'https://www.themoviedb.org';

// TODO: should fetch from TMDB configuration endpoint
const TMDB_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/';

const TMDB_PAGE_LIMIT: number = 20;

export {
  TMDB_API_KEY,
  TMDB_API_VERSION,
  TMDB_API_NEW_VERSION,
  TMDB_API_READ_ACCESS_TOKEN,
  TMDB_API_BASE_URL,
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  TMDB_PAGE_LIMIT
};
