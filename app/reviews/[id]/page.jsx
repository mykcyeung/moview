'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; 
import Button from "@/components/Button";
import Image from "next/image";
import { submitReview } from "@/utils/submitReview"; // Import the reusable function

const Reviews = () => {
  const { id } = useParams();  
  const router = useRouter();
  const movie = id;  

  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchReview = async () => {
      if (!movie) {
        console.error("No movie title provided");
        setError("No movie title provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Movie title from params:", movie);
        console.log(movie.id)

        const res = await fetch(`${API_URL}/reviews?movie=${movie}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!data || data.length === 0) {
          console.error("Review not found");
          setReviewData(null);
          setError("Review not found for this movie");
        } else {
          setReviewData(data[0]); 
        }
      } catch (error) {
        console.error("Error fetching review:", error);
        setError("Failed to fetch review");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [movie]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!reviewData) {
    return <div>Review not found</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen py-5 pt-18 md:pt-24">
      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-[1000px] px-5">
        
        {/* Image shown only on small screens */}
        <div className="sm:hidden w-full mb-4 flex justify-center">
          <Image
            src={reviewData.imageUrl}
            alt={reviewData.movie}
            width={300}
            height={450}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Image shown only on larger screens */}
        <div className="sm:block hidden w-3/10">
          <Image
            src={reviewData.imageUrl}
            alt={reviewData.movie}
            width={300}
            height={450}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="sm:w-7/10 w-full flex flex-col gap-5">
          {/* Movie and Rating */}
          <div className="grid grid-cols-3 gap-2 sm:gap-12 w-full">
            <div className="col-span-2 text-xl font-bold bg-white/50 px-6 py-3 rounded-full">{reviewData.movie}</div>
            <div className="text-lg font-extralight text-gray-300 bg-white/50 px-4 py-3 rounded-full">⭐{reviewData.rating}</div>
          </div>

          {/* Review */}
          <div className="w-full mt-4 text-lg bg-white/50 px-6 py-5 rounded-3xl min-h-[35vw] max-h-auto overflow-auto">
            {reviewData.review}
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-12 mt-5">
            <Button 
              onClick={() => router.push(`/reviews/${movie}/edit`)} 
              type="button" 
              className="font-bold px-6 py-2" 
              text="Edit" 
            />
            <Button 
              onClick={(e) => {
                e.preventDefault();
                submitReview("DELETE", API_URL, reviewData, movie, router, setAlert);
              }} 
              type="button" 
              className="font-bold px-6 py-2" 
              text="Delete" 
            />
          </div>

          {/* {alert && <div className="text-red-500">{alert}</div>} */}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
