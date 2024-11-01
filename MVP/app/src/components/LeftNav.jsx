// import React, { useContext, useState, useEffect } from "react";
// import { PdfContext } from "../contexts/PdfContext";
// import { AiOutlinePlus } from "react-icons/ai";
// import { LuPanelLeftClose } from "react-icons/lu";
// import { RiMicFill } from "react-icons/ri";
// import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";
// import { Circles } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
// import { ContextApp } from "../utils/Context";
// import axios from '../axios';
// import Features from "../pages/Features";

// function LeftNav() {
//   const { resetPdfPath } = useContext(PdfContext);
//   const { isVocalMode, handleToggleVocalMode } = useContext(ContextApp);
//   const { setShowSlide, showSlide } = useContext(ContextApp);
//   const [darkMode, setDarkMode] = useState(false);
//   const [documentPath, setDocumentPath] = useState("");
  
//   const handleReset = () => {
//     resetPdfPath(); // Appeler la fonction de réinitialisation
//   };

//   const handleToggle = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark', !darkMode);
//   };


//   return (
//     <div
//       className={
//         !showSlide
//           ? "h-screen bg-gray-900 w-[300px] z-30 border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0 custom-backgroundw"
//           : "hidden custom-backgroundw"
//       }
//     >
//       <div className="flex items-start justify-between w-full">
//         <span
//           className="border border-gray-600 rounded w-[80%] py-2 mb-4 text-xs flex gap-1 items-center justify-center cursor-pointer"
//           // onClick={() => window.location.reload()}
//           // onClick={() => {
//           //   resetPdfPath(); // Réinitialiser le PDF par défaut
//           // }}
//           onClick={handleReset}
//         >
//           <AiOutlinePlus fontSize={18} />
//           New Document
//         </span>
//         <span
//           className="border border-gray-600 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
//           title="Close sidebar"
//           onClick={() => setShowSlide(!showSlide)}
//         >
//           <LuPanelLeftClose />
//         </span>
//       </div>
//       <div className="h-[80%] w-full p-2 z-30 flex items-center justify-center overflow-hidden overflow-y-auto text-sm scroll my-2">
//         {documentPath ? (
//           <iframe
//             src={documentPath}
//             title="Document Viewer"
//             className="w-full h-full"
//           />
//         ) : (
//           <div className="flex items-center justify-center w-full h-full">
            
//             <Features/>
//           </div>
//         )}
//       </div>

//       <div className="w-full border-t border-gray-600 z-30 flex flex-col gap-2 items-center justify-center p-2">
//         <span className="rounded w-full py-2 px-2 text-xs flex items-center justify-center cursor-pointer border border-gray-400 hover:bg-gray-800 transition-all duration-300">
//           <span className="flex gap-2 items-center justify-center text-sm">
//             <FiArrowLeft className="text-xl" />
//             <Link to="/app/profile">
//               Back
//             </Link>
//           </span>
//         </span>

//         <div
//           className={`rounded w-full py-2 px-4 text-xs flex gap-4 items-center justify-between cursor-pointer transition-all duration-300 ${darkMode ? 'bg-gray-800 opacity-70 text-white' : 'bg-gray-200 text-black'}`}
//         >
//           <div className="flex items-center gap-2 text-sm">
//             <span>you</span>
//             <FiMessageCircle className={`text-2xl ${!darkMode && 'text-gray-600'}`} />
//             <div
//               onClick={handleToggleVocalMode}
//               className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isVocalMode ? 'bg-gray-800' : 'bg-gray-200'}`}
//             >
//               <div
//                 className={`bg-white w-4 h-4 rounded-full shadow-md transform ${isVocalMode ? 'translate-x-6' : 'translate-x-0'} transition-transform duration-300`}
//               />
//             </div>
//             <RiMicFill className={`text-2xl ${darkMode && 'text-gray-500'}`} />
//             <span>company</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeftNav;


// import React, { useContext, useState } from "react";
// // import { PdfContext } from "../contexts/PdfContext"; // Supprimé
// import { AiOutlinePlus } from "react-icons/ai";
// import { LuPanelLeftClose } from "react-icons/lu";
// import { RiMicFill } from "react-icons/ri";
// import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";
// import { Link } from 'react-router-dom';
// import { ContextApp } from "../utils/Context"; // Conserver l'import de ContextApp
// import Features from "../pages/Features";

// function LeftNav() {
//   const { isVocalMode, handleToggleVocalMode } = useContext(ContextApp);
//   const { setShowSlide, showSlide } = useContext(ContextApp);
//   const [darkMode, setDarkMode] = useState(false);

//   const handleReset = () => {
//     window.location.reload(); // Rafraîchir la fenêtre
//   };

//   const handleToggle = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark', !darkMode);
//   };

//   return (
//     <div
//       className={
//         !showSlide
//           ? "h-screen bg-gray-900 w-[300px] z-30 border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0 custom-backgroundw"
//           : "hidden custom-backgroundw"
//       }
//     >
//       <div className="flex items-start justify-between w-full">
//         <span
//           className="border border-gray-600 rounded w-[80%] py-2 mb-4 text-xs flex gap-1 items-center justify-center cursor-pointer"
//           onClick={handleReset} // Utilise handleReset
//         >
//           <AiOutlinePlus fontSize={18} />
//           New Document
//         </span>
//         <span
//           className="border border-gray-600 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
//           title="Close sidebar"
//           onClick={() => setShowSlide(!showSlide)}
//         >
//           <LuPanelLeftClose />
//         </span>
//       </div>
//       <div className="h-[80%] w-full p-2 z-30 flex items-center justify-center overflow-hidden overflow-y-auto text-sm scroll my-2">
//         <Features />
//       </div>
//       <div className="w-full border-t border-gray-600 z-30 flex flex-col gap-2 items-center justify-center p-2">
//         <span className="rounded w-full py-2 px-2 text-xs flex items-center justify-center cursor-pointer border border-gray-400 hover:bg-gray-800 transition-all duration-300">
//           <span className="flex gap-2 items-center justify-center text-sm">
//             <FiArrowLeft className="text-xl" />
//             <Link to="/app/profile">Back</Link>
//           </span>
//         </span>

//         <div
//           className={`rounded w-full py-2 px-4 text-xs flex gap-4 items-center justify-between cursor-pointer transition-all duration-300 ${darkMode ? 'bg-gray-800 opacity-70 text-white' : 'bg-gray-200 text-black'}`}
//         >
//           <div className="flex items-center gap-2 text-sm">
//             <span>you</span>
//             <FiMessageCircle className={`text-2xl ${!darkMode && 'text-gray-600'}`} />
//             <div
//               onClick={handleToggleVocalMode}
//               className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isVocalMode ? 'bg-gray-800' : 'bg-gray-200'}`}
//             >
//               <div
//                 className={`bg-white w-4 h-4 rounded-full shadow-md transform ${isVocalMode ? 'translate-x-6' : 'translate-x-0'} transition-transform duration-300`}
//               />
//             </div>
//             <RiMicFill className={`text-2xl ${darkMode && 'text-gray-500'}`} />
//             <span>company</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeftNav;
import React, { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { RiMicFill } from "react-icons/ri";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ContextApp } from "../utils/Context"; // Conserver l'import de ContextApp
import { usePdfContext } from "../contexts/PdfContext"; // Importer le contexte PDF
import Features from "../pages/Features";

function LeftNav() {
  const { isVocalMode, handleToggleVocalMode } = useContext(ContextApp);
  const { setShowSlide, showSlide } = useContext(ContextApp);
  const { fetchPdfUpdate } = usePdfContext(); // Utiliser le contexte PDF
  const [darkMode, setDarkMode] = useState(false);

  const handleReset = () => {
    fetchPdfUpdate(); // Appeler la fonction pour mettre à jour le PDF
  };

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div
      className={
        !showSlide
          ? "h-screen bg-gray-900 w-[300px] z-30 border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0 custom-backgroundw"
          : "hidden custom-backgroundw"
      }
    >
      <div className="flex items-start justify-between w-full">
        <span
          className="border border-gray-600 rounded w-[80%] py-2 mb-4 text-xs flex gap-1 items-center justify-center cursor-pointer"
          onClick={handleReset} // Utilise handleReset
        >
          <AiOutlinePlus fontSize={18} />
          New Document
        </span>
        <span
          className="border border-gray-600 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
          title="Close sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftClose />
        </span>
      </div>
      <div className="h-[80%] w-full p-2 z-30 flex items-center justify-center overflow-hidden overflow-y-auto text-sm scroll my-2">
        <Features />
      </div>
      <div className="w-full border-t border-gray-600 z-30 flex flex-col gap-2 items-center justify-center p-2">
        <span className="rounded w-full py-2 px-2 text-xs flex items-center justify-center cursor-pointer border border-gray-400 hover:bg-gray-800 transition-all duration-300">
          <span className="flex gap-2 items-center justify-center text-sm">
            <FiArrowLeft className="text-xl" />
            <Link to="/app/profile">Back</Link>
          </span>
        </span>

        <div className={`rounded w-full py-2 px-4 text-xs flex gap-4 items-center justify-between cursor-pointer transition-all duration-300 ${darkMode ? 'bg-gray-800 opacity-70 text-white' : 'bg-gray-200 text-black'}`}>
          <div className="flex items-center gap-2 text-sm">
            <span>you</span>
            <FiMessageCircle className={`text-2xl ${!darkMode && 'text-gray-600'}`} />
            <div
              onClick={handleToggleVocalMode}
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isVocalMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform ${isVocalMode ? 'translate-x-6' : 'translate-x-0'} transition-transform duration-300`}
              />
            </div>
            <RiMicFill className={`text-2xl ${darkMode && 'text-gray-500'}`} />
            <span>company</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
