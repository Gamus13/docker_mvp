import React from "react";

const Recommendation = ({ paragraph, logos }) => {
  return (
    <div className="text-center mt-2">
      <p className="mb-4 text-bold sm:text-lg font-medium text-gray-800 dark:text-white mx-4 sm:mx-auto sm:max-w-md lg:max-w-lg">
        {paragraph}
      </p>
      <div className="flex justify-center items-center space-x-6 flex-wrap">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="h-8 sm:h-12 w-auto mx-2 mb-4"
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
