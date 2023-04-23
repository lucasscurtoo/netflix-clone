import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import prismadb from "../../../lib/prismadb"
import serverAuth from "../../../lib/serverAuth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") res.status(405).end()

  try {
    await serverAuth(req, res)

    const { data: movies } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
    )

    const movieCount = movies.results.length
    const randomIndex = Math.floor(Math.random() * movieCount)
    const randomMovie = movies.results[randomIndex]

    const { data: movie } = await axios.get(
      `https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
    )

    return res.status(200).json(movie)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
