import Billboard from "@/components/Billboard"
import InfoModal from "@/components/InfoModal"
import MovieList from "@/components/MovieList"
import Navbar from "@/components/Navbar"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import useFavorites from "../../hooks/useFavorites"
import useInfoModal from "../../hooks/useInfoModal"
import React from "react"
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchUpcomingMovies,
} from "../../lib/fetchGetMovies"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }
  const upcomingMovies = await fetchUpcomingMovies()
  const popularMovies = await fetchPopularMovies()
  const nowPlayingMovies = await fetchNowPlayingMovies()

  return {
    props: { upcomingMovies, popularMovies, nowPlayingMovies },
  }
}

interface HomePageProps {
  upcomingMovies: { id: number }[]
  popularMovies: { id: number }[]
  nowPlayingMovies: { id: number }[]
}

const Home: React.FC<HomePageProps> = ({
  upcomingMovies,
  popularMovies,
  nowPlayingMovies,
}) => {
  const { data: favorites = [] } = useFavorites()
  const { closeModal, isOpen } = useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="relative">
        <div className="pb-40">
          <MovieList
            data={upcomingMovies}
            title="Upcoming Movies"
            description="Upcoming movies for theatres"
          />
          <MovieList
            data={popularMovies}
            title="Popular Movies"
            description=""
          />
          <MovieList
            data={nowPlayingMovies}
            title="Now playing Movies"
            description="Currently playing on theatres"
          />
          <MovieList data={favorites} title="My List" />
        </div>
      </div>
    </>
  )
}

export default Home
