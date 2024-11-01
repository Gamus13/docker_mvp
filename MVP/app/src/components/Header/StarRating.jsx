import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex justify-center items-center mb-2">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} className="text-yellow-500 text-xl sm:text-2xl lg:text-2xl" />
        ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 text-xl sm:text-2xl lg:text-2xl" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500 text-xl sm:text-2xl lg:text-3xl" />
        ))}
      <span className="ml-2 text-gray-600 text-sm sm:text-base lg:text-lg">{rating} out of {maxRating}</span>
    </div>
  );
};

export default StarRating;
