// Get the base path from environment variable or default to empty string
const BASE_PATH = process.env.NEXT_PUBLIC_BASEPATH || process.env.BASEPATH || '';

const NOTHING_PLACEHOLDER_IMAGE_PATH = `${BASE_PATH}/assets/svgs/nothing.svg`;
const PROFILE_PLACEHOLDER_IMAGE_PATH = `${BASE_PATH}/assets/svgs/person.svg`;
const ERROR_IMAGE_PATH = `${BASE_PATH}/assets/svgs/error.svg`;
const LOGO_IMAGE_PATH = `${BASE_PATH}/assets/svgs/logo.svg`;
const DARK_TMDB_IMAGE_PATH = `${BASE_PATH}/assets/svgs/tmdbgreen.svg`;
const LIGHT_TMDB_IMAGE_PATH = `${BASE_PATH}/assets/svgs/tmdb.svg`;


export {
  NOTHING_PLACEHOLDER_IMAGE_PATH,
  PROFILE_PLACEHOLDER_IMAGE_PATH,
  ERROR_IMAGE_PATH,
  LOGO_IMAGE_PATH,
  DARK_TMDB_IMAGE_PATH,
  LIGHT_TMDB_IMAGE_PATH
};
