// import { useState } from 'react';
// import axios from '../axios'; // Assurez-vous que le chemin est correct

// const FileUpload = () => {
//   const [uploadStatus, setUploadStatus] = useState(''); // Pour suivre le statut du téléchargement

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0]; // Obtenez le fichier sélectionné

//     if (file) {
//       // Créer un formData pour envoyer le fichier en multipart/form-data
//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         // Utiliser axios pour envoyer la requête
//         const response = await axios.post('/fileusers', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data', // Assurez-vous d'envoyer la bonne entête
//           },
//         });

//         if (response.status === 200) {
//           // Si la réponse est OK, mettre à jour l'état
//           setUploadStatus('File downloaded successfully!');
//         } else {
//           setUploadStatus('File download failed.');
//         }
//       } catch (error) {
//         console.error('Erreur lors du téléchargement du fichier:', error);
//         setUploadStatus('Erreur lors du téléchargement.');
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <form className="flex flex-col space-y-4">
//         <label className="text-sm font-medium">download your linkedin profile in pdf format :</label>
//         <input
//           type="file"
//           onChange={handleFileChange} // Appeler handleFileChange lors de l'ajout du fichier
//           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//         />
//       </form>

//       {/* Afficher le statut du téléchargement */}
//       {uploadStatus && <p className="text-sm text-center text-green-600 mt-4">{uploadStatus}</p>}
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState, useContext } from 'react';
import axios from '../axios';
import { UploadContext } from '../UploadContext'; // Import du contexte Upload
import LoadPdfButton from '../components/LoadPdfButton';

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [showButton, setShowButton] = useState(false); // État pour gérer l'affichage du bouton
  const { setRefresh } = useContext(UploadContext); // Accéder à l'état refresh dans le contexte

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/fileusers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setUploadStatus('File uploaded successfully!');
          setShowButton(true); // Afficher le bouton une fois l'upload réussi
        } else {
          setUploadStatus('File upload failed.');
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
        setUploadStatus('Erreur lors du téléchargement.');
      }
    }
  };

  const handleViewDocument = () => {
    setRefresh(prev => !prev); // Déclencher le rafraîchissement dans Editpdf
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="flex flex-col space-y-4">
        <label className="text-sm font-medium">Download your LinkedIn profile in PDF format :</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </form>

      {uploadStatus && <p className="text-sm text-center text-green-600 mt-4">{uploadStatus}</p>}

      {showButton && (
        // <button
        //   onClick={handleViewDocument}
        //   className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        // >
        //   Voir le document
        // </button>
        <LoadPdfButton/>
      )}
    </div>
  );
};

export default FileUpload;
