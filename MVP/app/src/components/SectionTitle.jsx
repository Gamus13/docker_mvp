
// import React, { useContext } from 'react';
// import { ThemeContext } from '../contexts/ThemeContext'; // Assurez-vous de fournir le chemin correct vers votre ThemeToggler

// const SectionTitle = ({ title, paragraph, width = "700px", center, mt = "60px" }) => {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div
//       className={`w-full ${center ? "mx-auto text-center" : ""}`}
//       style={{
//         maxWidth: width,
//         marginTop: mt,
//       }}
//     >
//       <h2 
//         className={`mb-4 font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
//         style={{
//           fontSize: '2.8rem', // Taille de base pour les petits écrans (mobile)
//           lineHeight: '1.2',
//         }}
//       >
//         {title}
//       </h2>
//       <p 
//         className={`leading-relaxed ${theme === 'dark' ? 'text-body-color-dark opacity-70' : 'text-body-color'}`} 
//         style={{
//           fontSize: '1rem', // Taille de base pour les petits écrans (mobile)
//           lineHeight: '1.5',
//         }}
//       >
//         {paragraph}
//       </p>

//       <style jsx>{`
//         @media (min-width: 600px) {
//           h2 {
//             font-size: 2.5rem; /* Taille augmentée pour les écrans moyens (tablette) */
//           }
//           p {
//             font-size: 1.125rem; /* Taille augmentée pour les écrans moyens (tablette) */
//           }
//         }

//         @media (min-width: 1024px) {
//           h2 {
//             font-size: 3rem; /* Taille augmentée pour les écrans larges (desktop) */
//           }
//           p {
//             font-size: 1.25rem; /* Taille augmentée pour les écrans larges (desktop) */
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SectionTitle;

import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'; // Assurez-vous de fournir le chemin correct vers votre ThemeToggler

const SectionTitle = ({ title, paragraph, width = "870px", center, mt = "60px" }) => {
  const { theme } = useContext(ThemeContext);

  // Divisez le titre en parties
  const titleParts = title.split('any document');

  return (
    <div
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{
        maxWidth: width,
        marginTop: mt,
      }}
    >
      <h2
        className={`mb-4 font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        style={{
          fontSize: '3.5rem', // Taille de base pour les petits écrans (mobile)
          lineHeight: '1.2',
        }}
      >
        {titleParts[0]}
        <span className="text-sky-400">any document</span>
        {titleParts[1]}
      </h2>
      <p
        className={`leading-relaxed ${theme === 'dark' ? 'text-body-color-dark opacity-70' : 'text-body-color'}`}
        style={{
          fontSize: '1rem', // Taille de base pour les petits écrans (mobile)
          lineHeight: '1.5',
        }}
      >
        {paragraph}
      </p>

      <style jsx>{`
        @media (min-width: 600px) {
          h2 {
            font-size: 2.5rem; /* Taille augmentée pour les écrans moyens (tablette) */
          }
          p {
            font-size: 1.125rem; /* Taille augmentée pour les écrans moyens (tablette) */
          }
        }

        @media (min-width: 1024px) {
          h2 {
            font-size: 3rem; /* Taille augmentée pour les écrans larges (desktop) */
          }
          p {
            font-size: 1.25rem; /* Taille augmentée pour les écrans larges (desktop) */
          }
        }
      `}</style>
    </div>
  );
};

export default SectionTitle;
