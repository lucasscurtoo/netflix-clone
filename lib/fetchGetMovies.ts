import axios from "axios"

export async function fetchUpcomingMovies() {
  const {
    data: { results },
  } = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
    params: {
      api_key: process.env.NEXT_PUBLIC_IMDB_API_KEY,
    },
  })
  return results
}
export async function fetchNowPlayingMovies() {
  const {
    data: { results },
  } = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
    params: {
      api_key: process.env.NEXT_PUBLIC_IMDB_API_KEY,
    },
  })
  return results
}
export async function fetchPopularMovies() {
  const {
    data: { results },
  } = await axios.get("https://api.themoviedb.org/3/movie/popular", {
    params: {
      api_key: process.env.NEXT_PUBLIC_IMDB_API_KEY,
    },
  })
  return results
}
