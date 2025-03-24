'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import ImageSelector from '@/components/ImageSelector';

const EditReviewPage = () => {
  const { id: movieEncoded } = useParams(); // Use movie title instead of ID
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [image, setImage] = useState('');
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(''); // State to hold decoded movie name

  const textAreaRef = useRef(null); // Reference for the textarea element

  // Fetch review on page load
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews?movie=${movieEncoded}`);
        if (!response.ok) throw new Error('Failed to fetch review');
        const data = await response.json();

        if (data.length === 0) {
          throw new Error('Review not found');
        }

        setRating(data[0].rating || '');
        setReview(data[0].review || '');
        setImage(data[0].imageUrl || '');
        setMovie(decodeURIComponent(movieEncoded)); // Decode the movie name here
      } catch (error) {
        setAlert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [movieEncoded]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [review]);

  // Handle form submission
  const handleSubmit = async (method, e) => {
    e.preventDefault();
    setAlert('');

    // Basic validation
    if (!rating) return setAlert('Rating is required!');
    if (!review) return setAlert('Review is required!');

    const data = { movie, rating, review, image };

    const url = `${API_URL}/reviews?movie=${encodeURIComponent(movie)}`; // Ensure movie is URL-encoded

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'DELETE' ? JSON.stringify(data) : null,
      });

      if (!response.ok) throw new Error('Failed to update review');

      setAlert('Success!');
      router.push(`/reviews/${movie}`);
    } catch (error) {
      console.error('Error:', error); // Log error for debugging
      setAlert(error.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="flex justify-center items-start min-h-screen pt-18 md:pt-24">
      <form onSubmit={(e) => handleSubmit('PUT', e)} className="flex flex-col items-center gap-5 mb-5 w-full max-w-[900px] px-4">
        
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          {/* Image shown only on small screens */}
          <div className="sm:hidden w-full mb-4 flex justify-center">
            <ImageSelector onSelect={setImage} selectedImage={image} />
          </div>

          {/* Image shown only on larger screens */}
          <div className="sm:block hidden w-3/10 flex-shrink-0">
            <ImageSelector onSelect={setImage} selectedImage={image} />
          </div>

          {/* Form fields */}
          <div className="sm:w-7/10 w-full flex flex-col gap-4">
            <div className="grid grid-cols-10 gap-3 items-center">
              <input
                type="text"
                value={movie}
                disabled
                className="col-span-5 p-3 rounded-3xl backdrop-blur-md bg-white/50 border-2 border-white"
              />
              <div className="col-span-5 grid grid-cols-10 items-center">
                <input
                  type="text"
                  placeholder="⭐"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="col-span-7 p-3 rounded-3xl backdrop-blur-md bg-white/50 border-2 border-white text-center sm:placeholder-shown:content-['⭐Rating']"
                />
                <span className="col-span-3 text-gray-600 font-semibold text-center">/10</span>
              </div>
            </div>

            {/* Review textarea */}
            <textarea
              ref={textAreaRef}
              placeholder="Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 rounded-3xl backdrop-blur-xl bg-white/50 border-2 resize-none min-h-[35vw] max-h-[35vw] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            />
          </div>
        </div>

        {/* Submit and cancel buttons */}
        <div className="flex gap-12 mt-5">
          <Button onClick={(e) => handleSubmit('PUT', e)} type="button" className="font-bold px-6 py-2" text="Save" />
          <Button onClick={() => router.push(`/reviews/${movie}`)} type="button" className="font-bold px-6 py-2" text="Cancel" />
        </div>

        {/* Alert */}
        {alert && <div className="alert">{alert}</div>}
      </form>
    </div>
  );
};

export default EditReviewPage;
