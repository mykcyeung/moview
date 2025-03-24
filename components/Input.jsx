'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import ImageSelector from './ImageSelector';
import { submitReview } from '@/utils/submitReview';

const Input = ({ reviewData = {} }) => {
  const router = useRouter();

  const [movie, setMovie] = useState(reviewData.movie || '');
  const [rating, setRating] = useState(reviewData.rating || '');
  const [review, setReview] = useState(reviewData.review || '');
  const [image, setImage] = useState(null); 
  const [alert, setAlert] = useState('');

  // Function to convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (method, e) => {
    e.preventDefault();

    const formData = {
      movie,
      rating,
      review,
    };

    // If an image is uploaded, convert to base64 and add to formData
    if (image) {
      try {
        const base64Image = await convertToBase64(image); 
        formData.image = base64Image;  // Add base64 image to form data
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setAlert("Error converting image. Please try again.");
        return;
      }
    }

    try {
      const reviewId = reviewData.id || null; // If editing, include the review ID
      await submitReview(method, formData, reviewId);  // Submit the review to the backend
      setAlert('Review submitted successfully!');

      // Redirect to homepage after submission or delete
      router.push('/');
    } catch (error) {
      console.error('Error performing operation:', error);
      setAlert(error.message || 'Network error. Please try again.');
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(reviewData.id ? 'PUT' : 'POST', e)}
      className="flex flex-col items-center gap-5 mb-5 w-full max-w-[900px] px-4"
    >
      <div className="flex flex-col sm:flex-row w-full gap-6">
        <div className="w-full sm:w-3/10 flex-shrink-0">
          <ImageSelector onImageUpload={setImage} />
        </div>

        <div className="w-full sm:w-7/10 flex flex-col gap-4">
          <div className="grid grid-cols-10 gap-3 items-center">
            <input
              type="text"
              placeholder="Movie"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
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
              <span className="col-span-3 text-gray-300 font-semibold text-center">/10</span>
            </div>
          </div>

          <textarea
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 rounded-3xl backdrop-blur-xl bg-white/50 border-2 resize-none h-[35vw]"
          />
        </div>
      </div>

      <div className="flex gap-12 mt-5">
        {reviewData.id ? (
          <>
            {/* For Edit and Delete */}
            <Button
              onClick={(e) => handleSubmit('PUT', e)}
              type="button"
              className="font-bold px-6 py-2"
              text="Edit"
            />
            <Button
              onClick={(e) => handleSubmit('DELETE', e)}
              type="button"
              className="font-bold px-6 py-2"
              text="Delete"
            />
          </>
        ) : (
          // For Creating a New Review
          <Button type="submit" className="font-bold px-6 py-2" text="Save" />
        )}
      </div>

      {/* Alert for success or error */}
      {alert && <div className="alert">{alert}</div>}
    </form>
  );
};

export default Input;
