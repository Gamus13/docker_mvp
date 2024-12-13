// import React, { useContext } from "react";
// import { ThemeContext } from "../contexts/ThemeContext"; // Assurez-vous que le chemin est correct

// const StepFlow = () => {
//   // Utilisation du contexte pour accéder au thème
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div
//       className={`w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 p-6 rounded-lg px-6 md:px-12 ${
//         theme === "dark"
//           ? "bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 text-white"
//           : "bg-gradient-to-r from-sky-400 via-blue-200 to-blue-600 text-black"
//       }`}
//     >
//       {/* Step 1 */}
//       <div className="flex flex-col items-center text-center">
//         <div className="bg-purple-700 p-4 rounded-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-8 w-8 text-white"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 10h11M9 21V3m6 4h5l3 5-3 5h-5m0 0V7m0 10v4"
//             />
//           </svg>
//         </div>
//         <h3 className="mt-2 text-lg font-semibold">Step 1</h3>
//         <p className="text-sm">Upload video OR paste a YouTube link</p>
//       </div>

//       {/* Arrow */}
//       <div className="hidden md:block">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6 text-purple-300"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </div>

//       {/* Step 2 */}
//       <div className="flex flex-col items-center text-center">
//         <div className="bg-purple-700 p-4 rounded-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-8 w-8 text-white"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19.428 15.341A8 8 0 1112 4v4m8 5h-4m-4-5h4m-4 6v-6"
//             />
//           </svg>
//         </div>
//         <h3 className="mt-2 text-lg font-semibold">Step 2</h3>
//         <p className="text-sm">AI creates shorts for you</p>
//       </div>

//       {/* Arrow */}
//       <div className="hidden md:block">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6 text-purple-300"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </div>

//       {/* Step 3 */}
//       <div className="flex flex-col items-center text-center">
//         <div className="bg-purple-700 p-4 rounded-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-8 w-8 text-white"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </div>
//         <h3 className="mt-2 text-lg font-semibold">Step 3</h3>
//         <p className="text-sm">Enjoy the free time you've unlocked</p>
//       </div>
//     </div>
//   );
// };

// export default StepFlow;


import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext"; // Assurez-vous que le chemin est correct

const StepFlow = () => {
  // Utilisation du contexte pour accéder au thème
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 p-6 rounded-lg px-6 md:px-12 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 text-white"
          : "bg-gradient-to-r from-sky-400 via-blue-200 to-blue-600 text-black"
      }`}
    >
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center">
        <div className={`${theme === "dark" ? "bg-sky-500" : "bg-sky-600"} p-4 rounded-full`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h11M9 21V3m6 4h5l3 5-3 5h-5m0 0V7m0 10v4"
            />
          </svg>
        </div>
        <h3 className="mt-2 text-lg font-semibold">Step 1</h3>
        <p className="text-sm">download or copy paste your information to generate the pdf document</p>
      </div>

      {/* Arrow */}
      <div className="hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${theme === "dark" ? "text-white-300" : "text-sky-600"} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center">
        <div className={`${theme === "dark" ? "bg-sky-500" : "bg-sky-600"} p-4 rounded-full`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.341A8 8 0 1112 4v4m8 5h-4m-4-5h4m-4 6v-6"
            />
          </svg>
        </div>
        <h3 className="mt-2 text-lg font-semibold">Step 2</h3>
        <p className="text-sm">customize the document as you wish and add electronic signatures</p>
      </div>

      {/* Arrow */}
      <div className="hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${theme === "dark" ? "text-white-300" : "text-sky-600"} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center">
        <div className={`${theme === "dark" ? "bg-sky-500" : "bg-sky-600"} p-4 rounded-full`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-2 text-lg font-semibold">Step 3</h3>
        <p className="text-sm">send your document by email from docx talk, while checking that it has been opened</p>
      </div>
    </div>
  );
};

export default StepFlow;
