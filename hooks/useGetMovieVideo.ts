import useSWR from "swr"
import fetcher from "../lib/fetcher"

const useGetMovieVideo = (movieId: number) => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, error, isLoading }
}

export default useGetMovieVideo
