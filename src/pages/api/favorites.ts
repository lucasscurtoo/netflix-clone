import { NextApiRequest, NextApiResponse } from "next"
import serverAuth from "../../../lib/serverAuth"
import axios from "axios"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") res.status(405).end()

  try {
    const { currentUser } = await serverAuth(req, res)
    console.log(currentUser)

    const favoriteMovies = []

    for (const movieId of currentUser.favoriteIds) {
      const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
      const response = await axios.get(movieUrl)
      favoriteMovies.push(response.data)
    }

    return res.status(200).json(favoriteMovies)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
