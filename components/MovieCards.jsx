import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MovieCards = ({ title, imageUrl, rating }) => {
  // Ensure imageUrl is not empty or undefined
  const imageSrc = imageUrl && imageUrl.trim() !== "" ? imageUrl : '/path/to/placeholder-image.jpg'; // Replace with a placeholder image if no valid imageUrl

  return (
    <Link
      href={`/reviews/${encodeURIComponent(title)}`}
      className='backdrop-blur-md bg-white/50 rounded-2xl py-3 px-2 max-w-lg mb-2 hover:scale-105 duration-300'
    >
      <Image
        src={imageSrc}  // Use the valid image or a fallback image
        alt={title}
        width={500}  // Set a width (can be adjusted based on design)
        height={500}  // Set a height (can be adjusted based on design)
        sizes="100vw"
        className="w-full max-h-[45vw] object-cover rounded-lg"
      />

      <div className='flex flex-col justify-center items-center mt-3'>
        <div className='font-bold text-lg'>
          {title}
        </div>
        <div className='text-gray-300 text-sm'>
          ⭐ {rating}
        </div>
      </div>
    </Link>
  );
};

export default MovieCards;
