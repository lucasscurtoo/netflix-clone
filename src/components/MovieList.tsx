import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"
import { useIsMobile } from "../../hooks/useIsMobile"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

interface MoviesListProps {
  data: { id: number }[]
  title: string
  description?: string
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
}

const MovieList: React.FC<MoviesListProps> = ({ data, title, description }) => {
  const { isMobileState } = useIsMobile()

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
      {!isMobileState ? (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="inline-flex w-full space-x-6 lg:p-5"
          focusOnSelect={false}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          slidesToSlide={1}
        >
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </Carousel>
      ) : (
        <div className="flex overflow-x-scroll overflow-y-hidden scrollbar-none space-x-6 z-10 relative lg:p-5">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
export default MovieList
