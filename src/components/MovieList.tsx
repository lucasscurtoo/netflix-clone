import React from "react"
import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"

interface MoviesListProps {
  data: { id: number }[]
  title: string
  description?: string
}

const MovieList: React.FC<MoviesListProps> = ({ data, title, description }) => {
  if (isEmpty(data)) {
    return null
  }

  return (
    <div className="px-4 md:px-12 mt-8 mb-10">
      <div className="flex items-center space-x-4 mb-4 truncate">
        <h1 className="text-white text-lg md:text-xl lg:text-2xl font-bold lg:font-semibold">
          {title}
        </h1>
        <p className="text-gray-300 text-sm md:text-xl  font-medium">
          {description}
        </p>
      </div>
      <div className="flex overflow-x-scroll overflow-y-hidden scrollbar-none space-x-6 z-10 relative lg:p-5">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  )
}
export default MovieList
