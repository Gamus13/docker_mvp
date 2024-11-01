import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext'; // Ajustez le chemin d'importation selon votre projet

export default function TitleLight({
  className,
  category,
  title,
  description,
  descriptionStyles,
  titleStyles,
}) {
  const { theme } = useContext(ThemeContext); // Obtenez le thème du contexte

  return (
    <div className={`pt-28 text-center text-background ${className}`}>
      {category && (
        <p className={`text-lg font-normal uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {category}
        </p>
      )}
      <h1
        className={`mt-4 text-3xl font-extrabold tracking-tighter md:text-5xl ${titleStyles} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        {title &&
          title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
      </h1>
      <div className="pt-4">
        <p
          className={`mx-auto max-w-md text-background/70 md:text-lg ${descriptionStyles} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          {description &&
            description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}
