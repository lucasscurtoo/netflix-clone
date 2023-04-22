import axios from "axios"
import React, { useCallback, useMemo } from "react"
import useCurrentUser from "../../hooks/useCurrentUser"
import useFavorites from "../../hooks/useFavorites"
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId)
  }, [movieId, currentUser])

  const toggleFavorites = useCallback(async () => {
    let response

    if (isFavorite) {
      console.log(movieId)
      response = await axios.delete("/api/favorite", {
        data: { movieId: movieId },
      })
    } else {
      response = await axios.post("/api/favorite", { movieId })
    }
    const updatedFavoritesIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoritesIds,
    })
    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-8 h-8 lg:w-10 lg:h-10
  border-white border-2 rounded-full flex justify-center items-center 
  transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={15} />
    </div>
  )
}
export default FavoriteButton
