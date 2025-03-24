import Image from 'next/image'
import React from 'react'

const Search = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-indigo-950 rounded-full px-5 py-2 flex justify-between items-center w-full md:max-w-[50vw]">
        <div className="text-lg font-extralight text-gray-400">
          Searching Bar Coming Soon
        </div>

        <Image
          src="/search.svg"
          alt="search"
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}

export default Search
