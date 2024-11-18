import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const SingleBlog = ({ blog }) => {
  const { theme } = useContext(ThemeContext);
  const { title, image, paragraph, author, tags, created_at, category, description } = blog;

  const isDarkMode = theme === 'dark';

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-sm shadow-one duration-300 hover:shadow-two
        ${isDarkMode ? 'bg-gray-800 hover:shadow-gray-700' : 'bg-white'}
      `}
    >
      <a href="/blog-details" className="relative block aspect-[37/22] w-full">
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold capitalize text-white">
          {category }
        </span>
        {/* Utilisez le bon chemin pour l'image */}
        <img src={`http://localhost/${image}`} alt="blog" className="w-full h-full object-cover" />
      </a>
      <div className={`p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8 ${isDarkMode ? 'text-gray-300' : 'text-body-color'}`}>
        <h3>
          <a
            href="/blog-details"
            className={`mb-4 block text-xl font-bold sm:text-2xl ${isDarkMode ? 'text-white hover:text-primary' : 'text-black hover:text-primary'}`}
          >
            {title}
          </a>
        </h3>
        <p className={`mb-6 border-b pb-6 text-base font-medium ${isDarkMode ? 'border-white border-opacity-10' : 'border-body-color border-opacity-10'}`}>
          {description}
        </p>
        <div className="flex items-center">
          <div className={`mr-5 flex items-center border-r pr-5 ${isDarkMode ? 'border-white border-opacity-10' : 'border-body-color border-opacity-10'} xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5`}>
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                {/* Utilisez le bon chemin pour l'image de l'auteur */}
                <img src={`http://localhost/${image}`} alt="author" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <div className="w-full">
              <h4 className={`mb-1 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                By {author?.name || 'Unknown'}
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-body-color'}`}>
                {author?.designation || 'No designation'}
              </p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className={`mb-1 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-dark'}`}>
              Date
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-body-color'}`}>
              {created_at ? formatDate(created_at) : 'No date available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
