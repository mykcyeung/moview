'use client';

import MovieCards from "@/components/MovieCards";
import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch movie reviews from the Lambda API
    const fetchMovies = async () => {
      try {
        // Fetch from API Gateway (replace with your actual API URL)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`
          //enable CORS
          // , {
          // method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          // }, 
          // mode: "cors",
          // }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="flex justify-center items-center font-bold text-3xl min-h-screen">Hang in there</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-16 md:pt-24"> {/* Add padding-top for larger screens */}
      <div className="mx-5 mt-4 mb-6">
        <Search />
      </div>
      {movies.length === 0 ? (
        <div className="flex justify-center items-center font-bold text-2xl min-h-screen">
          Oops...seems no review to show
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-5 grid-cols-2 mx-5">
          {/* change key back to id */}
          {movies.map((movie) => (
            <MovieCards key={movie.id} image={movie.imageUrl} title={movie.movie} rating={movie.rating} />
          ))}
        </div>
      )}
    </div>
  );
}
