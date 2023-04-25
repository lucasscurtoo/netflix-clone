import { useRouter } from "next/router"
import React from "react"
import useMovie from "../../../hooks/useMovie"
import { AiOutlineArrowLeft } from "react-icons/ai"
import dynamic from "next/dynamic"
import useGetMovieVideo from "../../../hooks/useGetMovieVideo"
import { filterTrailerVideo } from "@/helpers/functions"

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
})

const Watch = () => {
  const router = useRouter()
  const { movieId } = router.query
  const { data } = useMovie(movieId as string)
  const { data: videoData } = useGetMovieVideo(data?.id)
  const trailerVideo = filterTrailerVideo(videoData)

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black/70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerVideo?.key}`}
        playing={true}
        width="100%"
        height="100%"
        controls={true}
        playsinline={true}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 0,
              iv_load_policy: 3,
            },
          },
        }}
      />
    </div>
  )
}
export default Watch
