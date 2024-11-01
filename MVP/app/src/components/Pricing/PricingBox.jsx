import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const PricingBox = (props) => {
  const { theme } = useContext(ThemeContext);
  const { price, originalPrice, duration, packageName, subtitle, children } = props;

  // Déterminez les classes CSS en fonction du thème
  const boxClasses = `relative z-1 rounded-sm px-8 py-10 shadow-three hover:shadow-one ${
    theme === 'dark' ? 'bg-gray-800 shadow-two hover:shadow-gray-dark' : 'bg-white'
  }`;

  const priceClasses = `price mb-2 text-[32px] font-bold ${
    theme === 'dark' ? 'text-white' : 'text-black'
  }`;

  const originalPriceClasses = `text-red-500 line-through text-lg ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  const packageNameClasses = `mb-2 text-xl font-bold ${
    theme === 'dark' ? 'text-white' : 'text-dark'
  }`;

  const subtitleClasses = `mb-7 text-base ${
    theme === 'dark' ? 'text-gray-300' : 'text-body-color'
  }`;

  const linkClasses = `flex w-full items-center justify-center rounded-sm bg-sky-400 p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp`;

  return (
    <div className="w-full">
      <div className={boxClasses}>
        <div className="flex items-center justify-between">
          <h3 className={priceClasses}>
            $<span className="amount">{price}</span>
            <span className="time text-lg font-medium">/{duration}</span>
          </h3>
          <h4 className={packageNameClasses}>
            {packageName}
          </h4>
        </div>
        {/* Affichage du prix barré */}
        {originalPrice && (
          <p className={originalPriceClasses}>
            ${originalPrice}
          </p>
        )}
        <p className={subtitleClasses}>{subtitle}</p>
        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
          <Link to="/app/auth/signin" className={linkClasses}>
            Start Trial
          </Link>
        </div>
        <div>{children}</div>
        <div className="absolute bottom-0 right-0">
          <svg
            width="179"
            height="158"
            viewBox="0 0 179 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
              fill="url(#paint0_linear_70:153)"
            />
            <path
              opacity="0.3"
              d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
              fill="url(#paint1_linear_70:153)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_70:153"
                x1="69.6694"
                y1="29.9033"
                x2="196.108"
                y2="83.2919"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_70:153"
                x1="165.348"
                y1="-75.4466"
                x2="-3.75136"
                y2="103.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
