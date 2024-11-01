import React, { useContext } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';

const SectionTitle = ({ title, paragraph, width = "570px", center = false, mb = "100px" }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className={`mb-4 text-3xl font-bold !leading-tight  dark:text-white sm:text-4xl md:text-[45px] ${theme === 'dark' ? ' text-gray-100' : 'text-black'}`}>
        {title}
      </h2>
      <p className={`text-base !leading-relaxed text-body-color md:text-lg ${theme === 'dark' ? ' text-gray-400' : 'text-black'}`}>
        {paragraph}
      </p>
    </div>
  );
};

export default SectionTitle;
