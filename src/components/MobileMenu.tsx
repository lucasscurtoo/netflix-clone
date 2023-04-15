import React from "react"

interface MobileMenuProps {
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null
  }
  return (
    <div
      className="bg-black w-56 absolute top-8 
      left-0 py-5 flex-col border-2 border-gray-800 flex text-white"
    >
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">Home</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">Series</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">Films</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">New & Popular</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">My List</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">
          Browse By Languages
        </div>
      </div>
    </div>
  )
}
export default MobileMenu
