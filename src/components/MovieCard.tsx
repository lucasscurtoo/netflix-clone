import Image from "next/image"
import React from "react"
import useInfoModal from "../../hooks/useInfoModal"
interface MovieCardProps {
  data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const { openModal } = useInfoModal()

  return (
    <div
      className="group bg-zinc-900 col-span relative h-[60vw] min-w-[40%] lg:h-[20vw] lg:min-w-[15%]"
      onClick={() => openModal(data?.id)}
    >
      <Image
        className="cursor-pointer object-cover 
      shadow-xl rounded-md group-hover:opacity-80 md:group-hover:scale-105 overflow-visible 
       w-full h-full hover:borde transition"
        src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
        alt="Movie thumbnail"
        fill
        placeholder="blur"
        blurDataURL={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
      />
    </div>
  )
}
export default MovieCard
