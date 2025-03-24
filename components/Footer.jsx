import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='my-14 flex flex-col justify-center items-center gap-3'>
      <div className='flex gap-4'>
        <Link
          target='_blank'
          href="https://www.linkedin.com/in/jay-kcy-aa7926254/"
        >
        
        <Image
          src="/linkedinbw.svg"
          alt='linkedin'
          width={30}
            height={30}
            className='hover:scale-105 duration-300'
          />
        </Link>

        <Link
          target='_blank'
          href="https://github.com/mykcyeung">
        <Image
          src="/github.svg"
          alt='github'
          width={30}
          height={30}
          className='hover:scale-105 duration-300'
          />
          </Link>
      </div>
      <div className='font-extralight text-xs'>
        copyright©{currentYear} Jay. All rights reserved.
      </div>
    </div>
  )
}

export default Footer