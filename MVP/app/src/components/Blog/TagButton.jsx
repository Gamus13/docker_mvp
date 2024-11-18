import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const TagButton = ({ href = "#0", text }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  
  return (
    <a
      href={href}
      className={`bg-gray-light mb-3 mr-3 inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm text-black duration-300 hover:bg-primary hover:text-white dark:bg-[#2C303B] dark:text-white dark:hover:bg-primary ${isDarkMode ? 'text-white' : 'bg-white'}`}
    >
      {text}
    </a>
  );
};

export default TagButton;
