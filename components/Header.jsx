'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  // Track scrolling position
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-3 px-5 sm:px-14 transition-all ${
        scrolling
          ? "backdrop-blur-sm bg-gradient-to-b from-white/20 to-transparent shadow-xs"
          : "bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm"
      }`}
    >
      {/* Smooth Bottom Blur Effect */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      <div className="flex gap-3">
      {/* <Image
  src="/favicon.svg" 
  alt="logo"
  width={28}
  height={28}
/> */}
      <Link
        href="/"
        className={`text-4xl md:text-6xl font-bold hover:scale-105 duration-300 transition-all ${
          scrolling ? "text-3xl md:text-5xl" : ""
        } 
        text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-400 
        hover:text-transparent hover:bg-gradient-to-r hover:from-[#1d4ed8] hover:via-[#1e40af] hover:to-[#1e3a8a] bg-clip-text`}
      >
        moview
      </Link>
      </div>
      
      
      <div className="flex gap-6">
      <Link className="font-bold text-md px-4 py-2 rounded-full text-gray-400 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 hover:text-white hover:from-blue-700 hover:via-indigo-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 hover:scale-105" href="/more">
        About
      </Link>

      <Link
        className="font-bold text-md px-4 py-2 rounded-full text-gray-400 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 hover:text-white hover:from-blue-700 hover:via-indigo-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 hover:scale-105"
        href="/reviews"
      >
        Post
      </Link>
      </div>
      
    </header>
  );
};

export default Header;
