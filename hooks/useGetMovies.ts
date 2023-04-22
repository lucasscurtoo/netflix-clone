import useSWR from "swr"
import fetcher from "../lib/fetcher"

const useGetMovies = (movieId: string) => {
  const { data: upcomingMoviesData } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const { data: nowPlayingMoviesData } = useSWR(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const { data: popularMoviesData } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return { upcomingMoviesData, nowPlayingMoviesData, popularMoviesData }
}

export default useGetMovies
