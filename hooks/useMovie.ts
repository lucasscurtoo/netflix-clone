import useSWR from "swr"
import fetcher from "../lib/fetcher"

const useMovie = (movieId: string) => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, error, isLoading }
}

export default useMovie
