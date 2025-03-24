import React from 'react';

const Button = ({ text, className = "", onClick, disable = false, type }) => {
  return (
    <button
      onClick={onClick} // Just pass the handler directly
      type={type}
      disabled={disable}
      className={`rounded-full text-gray-400 bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 hover:text-white hover:from-blue-700 hover:via-indigo-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 hover:scale-105 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
