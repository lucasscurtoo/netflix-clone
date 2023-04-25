interface Video {
  id: string
  iso_3166_1: string
  iso_639_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}

interface VideoData {
  id: number
  results: Video[]
}
export const filterTrailerVideo = (videoData: VideoData) =>
  videoData?.results.find((video: Video) => video.type === "Trailer")
