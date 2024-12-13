// import React from "react";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { FiUser } from "react-icons/fi";
// import axios from '../axios';

// const Library = () => {

//   const handleLogout = async () => {
//     try {
//       const resp = await axios.post('/logout');
//       if (resp.status === 200) {
//         localStorage.removeItem('user');
//         window.location.href = '/app/';
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-between px-5 py-4 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
//         {/* Wrapper pour englober tout le groupe avec l'icône de logout et l'icône de direction */}
//         <div 
//           onClick={handleLogout}
//           className="flex items-center gap-2 " 
//         >
//           <FiUser className="text-neutral-400" size={20} title="User" />
//           <p className="text-neutral-400 font-medium text-md">Logout</p>
//         </div>
//         {/* La div contenant l'icône de direction est maintenant séparée mais proche pour maintenir la mise en page */}
//         <div className="flex items-center">
//           <AiOutlineArrowRight
//             className="text-neutral-400 cursor-pointer hover:text-white transition"
//             size={20}
//           />
//         </div>
//       </div>
//       <div className="flex flex-col gap-y-2 mt-4 px-3">
//         {/* Ajoutez ici le reste de vos composants ou éléments de bibliothèque */}
//       </div>
//     </div>
//   );
// };

// export default Library;


import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import axios from '../axios';

const Library = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Activer l'état de chargement au début de la requête
    try {
      const resp = await axios.post('/logout');
      if (resp.status === 200) {
        localStorage.removeItem('user');
        window.location.href = '/app/';
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Désactiver l'état de chargement une fois la requête terminée
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
        {/* Bouton de logout avec l'indicateur de chargement */}
        <div 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <FiUser className="text-neutral-400" size={20} title="User" />
          <p className="text-neutral-400 font-medium text-md">Logout</p>
        </div>
        <div className="flex items-center">
          {/* Affiche un spinner si loading est true, sinon l'icône de flèche */}
          {loading ? (
            <div className="loader border-4 border-t-4 border-gray-300 rounded-full w-5 h-5 animate-spin"></div>
          ) : (
            <AiOutlineArrowRight
              className="text-neutral-400 cursor-pointer hover:text-white transition"
              size={20}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {/* Ajoutez ici le reste de vos composants ou éléments de bibliothèque */}
      </div>
    </div>
  );
};

export default Library;
