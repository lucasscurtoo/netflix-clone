import React, { useCallback, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import PlayButton from "./PlayButton"
import FavoriteButton from "./FavoriteButton"
import useInfoModal from "../../hooks/useInfoModal"
import useMovie from "../../hooks/useMovie"
import Image from "next/image"

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

type Genre = {
  id: number
  name: string
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)
  const { movieId } = useInfoModal()
  const { data = {} } = useMovie(movieId as string)

  console.log(data)

  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  if (!visible) {
    return null
  }

  return (
    <div
      className="z-50 transition duratio-300 bg-black/80 flex justify-center 
  items-center overflow-x-hidden overflow-y-auto fixed inset-0"
    >
      <div className="relative  mx-auto max-w-3xl rounded-md overflow-hidden w-4/5 lg:w-full">
        <div
          className={`${isVisible ? "scale-100" : "scale-0"} transform
            duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96 ">
            <Image
              className="w-full brightness-[60%] object-cover h-full"
              src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
              fill
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
              alt="Movie backdrop"
              sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10
                 rounded-full bg-black/70 flex items-center justify-center"
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-5">
              <p
                className="text-white text-3xl md:text-4xl h-full lg:text-5xl
                 font-bold mb-8"
              >
                {data?.title}
              </p>
              <div className="flex gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-5 py-8">
            <div className="flex space-x-4 mb-4">
              <p className="text-green-400 font-semibold text-lg">
                {data?.release_date?.substring(0, 4)}
              </p>
              <p className="text-white font-semibold text-lg">
                {data?.runtime &&
                  `${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}m`}
              </p>
            </div>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-sm lg:text-lg">
              {data?.genres?.map((genre: Genre) => genre.name).join(", ")}
            </p>
            <p className="hidden md:block mt-4 text-gray-300 text-lg">
              {data?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InfoModal
