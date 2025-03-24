import { useState } from "react";

const ImageSelector = ({ onSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Display preview
      onSelect(selectedFile); // Pass the selected file
    }
  };

  return (
    <label
      className={`w-full h-full flex items-center justify-center overflow-hidden cursor-pointer relative 
        ${preview ? '' : 'rounded-full bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 hover:from-blue-700 hover:via-indigo-600 hover:to-blue-800'}
        transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
        sm:px-8 sm:py-4 py-2 px-6 sm:rounded-3xl`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      {preview ? (
        <img
          src={preview}
          alt="Selected Preview"
          className="w-full h-full object-cover rounded-2xl" // Keep the image always rounded
        />
      ) : (
        <span className="text-gray-400 text-3xl font-bold">+</span> // The + sign appears only when no image is selected
      )}
    </label>
  );
};

export default ImageSelector;
