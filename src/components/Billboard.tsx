import React, { useCallback, useRef } from "react"
import useBillboard from "../../hooks/useBillboard"
import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from "./PlayButton"
import useInfoModal from "../../hooks/useInfoModal"
import useGetMovieVideo from "../../hooks/useGetMovieVideo"
import dynamic from "next/dynamic"
import { useIsMobile } from "../../hooks/useIsMobile"
import { filterTrailerVideo } from "@/helpers/functions"

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
})

const Billboard = () => {
  const { data } = useBillboard()
  const { openModal } = useInfoModal()
  const { data: videoData } = useGetMovieVideo(data?.id)
  const { isMobileState } = useIsMobile()

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

  const trailerVideo = filterTrailerVideo(videoData)

  return (
    <div className="relative lg:h-[56.25vw] h-[100vw] w-full">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerVideo?.key}`}
        playing={true}
        muted={true}
        width="100%"
        height={isMobileState ? "100vw" : "56.25vw"}
        controls={false}
        className="absolute bottom-16"
        loop={true}
        playsinline={true}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              modestbranding: 0,
            },
          },
        }}
      />

      <div className="absolute top-[30%] sm:top-[40%] ml-4 md:ml-16">
        <p
          className="text-white text-xl 
            md:text-5xl h-full w-[50%]
           lg:text-6xl font-bold
            drop-shadow-xl"
        >
          {data?.title}
        </p>
        <p
          className="text-white text-sm
          sm:text-lg mt-3 md:mt-8 w-5/6 md:w-4/5 
          lg:w-1/2 drop-shadow-xl"
        >
          {data?.overview}
        </p>
        <div className="flex items-center mt-3 md:mt-4 gap-4">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="text-white bg-white bg-opacity-30 rounded-md 
          py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
          flex items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}
export default Billboard
