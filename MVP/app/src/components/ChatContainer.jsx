
// import React, { useContext, useState } from "react";
// import { ContextApp } from "../utils/Context";
// import { LuPanelLeftOpen } from "react-icons/lu";
// import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import Editpdf from "./editpdf";

// const ChatContainer = () => {
//   const { setShowSlide, showSlide, setMobile, Mobile } = useContext(ContextApp);

//   const [loading, setLoading] = useState(true); // état de chargement

//   // Fonction qui arrêtera le chargement une fois que Editpdf est rendu
//   const handleEditLoaded = () => {
//     setLoading(false); // Arrête le loader
//   };

//   return (
//     <div
//       className={
//         showSlide
//           ? "h-screen w-screen bg-gray-700 flex items-start justify-between flex-col p-2 custom-background"
//           : "h-screen w-full lg:w-[calc(100%-300px)] bg-gray-700 flex items-start justify-between flex-col p-2 custom-background"
//       }
      
//     >
//       <span
//         className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-600 duration-200"
//         title="Open sidebar"
//         onClick={() => setShowSlide(!showSlide)}
//       >
//         {showSlide && <LuPanelLeftOpen />}
//       </span>
//       <span
//         className="rounded px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600"
//         title="Open sidebar"
//         onClick={() => setMobile(!Mobile)}
//       >
//         <HiOutlineMenuAlt2 fontSize={20} />
//       </span>

//       {/* Affichage de l'animation de chargement */}
//       {loading && (
//         <div className="flex items-center justify-center w-full h-full">
//           <div className="loading-spinner"></div> {/* Le nouveau spinner de chargement */}
//           <p className="text-white">Loading...</p>
//         </div>
//       )}

//       {/* Une fois que le composant Editpdf est chargé, on enlève le loader */}
//       <div style={{ display: loading ? "none" : "block", width: "100%", overflow: "hidden" }}>
//         <Editpdf className="w-full" onLoad={handleEditLoaded} /> {/* Passe onLoad */}
//       </div>
//     </div>
//   );
// };

// export default ChatContainer;

import React, { useContext, useState } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Editpdf from "./editpdf";
import axios from '../axios'; // Ajouter axios pour effectuer la requête

const ChatContainer = () => {
  const { setShowSlide, showSlide, setMobile, Mobile } = useContext(ContextApp);
  const [refresh, setRefresh] = useState(false); // État pour forcer le rafraîchissement d'Editpdf
  const [documentData, setDocumentData] = useState(null); // Stocker les données du backend
  const [loading, setLoading] = useState(true); // État de chargement

  // Fonction qui arrêtera le chargement une fois que Editpdf est rendu
  const handleEditLoaded = () => {
    setLoading(false); // Arrête le loader
  };
  // Fonction qui sera appelée lorsque le document est visualisé (au clic sur "Voir le document")
  const handleViewDocument = async () => {
    setLoading(true); // Affiche un spinner pendant le chargement

    try {
      // Requête axios vers le backend pour récupérer les données du document
      const response = await axios.get('/pdfs'); // Mettre à jour l'URL selon votre API
      if (response.status === 200) {
        setDocumentData(response.data); // Met à jour l'état avec les données du backend
        setRefresh((prev) => !prev); // Rafraîchir Editpdf
      } else {
        console.error("Erreur lors de la récupération des données du PDF");
      }
    } catch (error) {
      console.error("Erreur lors de la requête Axios", error);
    } finally {
      setLoading(false); // Arrête le loader une fois les données récupérées
    }
  };

  return (
    <div
      className={
        showSlide
          ? "h-screen w-screen bg-gray-700 flex items-start justify-between flex-col p-2 custom-background"
          : "h-screen w-full lg:w-[calc(100%-300px)] bg-gray-700 flex items-start justify-between flex-col p-2 custom-background"
      }
    >
      <span
        className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-600 duration-200"
        title="Open sidebar"
        onClick={() => setShowSlide(!showSlide)}
      >
        {showSlide && <LuPanelLeftOpen />}
      </span>
      <span
        className="rounded px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600"
        title="Open sidebar"
        onClick={() => setMobile(!Mobile)}
      >
        <HiOutlineMenuAlt2 fontSize={20} />
      </span>

      {/* Affichage de l'animation de chargement */}
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="loading-spinner"></div> {/* Le nouveau spinner de chargement */}
          <p className="ml-2 text-white">Loading...</p>
        </div>
       )}

      {/* Une fois que le composant Editpdf est chargé, on enlève le loader */}
      {/* <div style={{ width: "100%", overflow: "hidden" }}> */}
      <div style={{ display: loading ? "none" : "block", width: "100%", overflow: "hidden" }}>
        
        <Editpdf className="w-full" onLoad={handleEditLoaded} documentData={documentData} refresh={refresh} /> {/* Passe documentData et refresh */}
      </div>
    </div>
  );
};

export default ChatContainer;
