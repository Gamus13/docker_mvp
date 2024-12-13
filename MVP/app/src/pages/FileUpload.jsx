// import React, { useState, useContext } from 'react';
// import axios from '../axios';
// import { UploadContext } from '../UploadContext'; // Import du contexte Upload
// import LoadPdfButton from '../components/LoadPdfButton';
// import { useToast } from '../contexts/ToastContext';

// const FileUpload = () => {
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [showButton, setShowButton] = useState(false); // État pour gérer l'affichage du bouton
//   const [loading, setLoading] = useState(false); // État pour l'animation de chargement
//   const { setRefresh } = useContext(UploadContext); // Accéder à l'état refresh dans le contexte
//   const showToast = useToast(); // Utilisez uniquement showToast

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     showToast('info', "Step 2 Successful. Please wait until the download is complete.");
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       setLoading(true); // Démarrer l'animation de chargement

//       try {
//         const response = await axios.post('/fileusers', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (response.status === 200) {
//           setUploadStatus('File uploaded successfully!');
//           showToast('success', "The file was successfully uploaded.Please click on the black icon which when hovering displays (save the generated document) this will save your work in order to send it to the recipient. ");
//           setShowButton(true); // Afficher le bouton une fois l'upload réussi
//         } else {
//           setUploadStatus('File upload failed.');
//           showToast('error', "Échec du téléchargement du fichier.");
//         }
//       } catch (error) {
//         console.error('Erreur lors du téléchargement du fichier:', error);
//         setUploadStatus('Erreur lors du téléchargement.');
//         showToast('error', "Error while downloading. Please try again.");
//       } finally {
//         setLoading(false); // Arrêter l'animation de chargement après l'envoi
//       }
//     }
//   };

//   const handleViewDocument = () => {
//     setRefresh(prev => !prev); // Déclencher le rafraîchissement dans Editpdf
//   };

//   return (
//     <div className="w-full max-w-md mx-auto relative">
//       <form className="flex flex-col space-y-4">
//         <label className="text-sm font-medium">3- Download your LinkedIn profile in PDF format :</label>
//         <div className="relative flex items-center">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//           />
//           {loading && (
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//               <svg
//                 className="animate-spin h-4 w-4 text-indigo-600"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 ></path>
//               </svg>
//             </div>
//           )}
//         </div>
//       </form>

//       {uploadStatus && <p className="text-sm text-center text-green-600 mt-4">{uploadStatus}</p>}

//       {/* {showButton && (
//         <LoadPdfButton className="ml-2"/>
//       )} */}
//     </div>
//   );
// };

// export default FileUpload;


import React, { useState, useContext } from 'react';
import axios from '../axios';
import { UploadContext } from '../contexts/UploadContext'; // Import du contexte Upload
import { useToast } from '../contexts/ToastContext';

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false); // État pour l'animation de chargement
  const { setRefresh, disableIconTemporarily } = useContext(UploadContext); // Accéder à l'état refresh et la fonction disableIconTemporarily
  const showToast = useToast();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    showToast('info', "Step 2 Successful. Please wait until the download is complete.");
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true); // Démarrer l'animation de chargement

      try {
        const response = await axios.post('/fileusers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setUploadStatus('File uploaded successfully!');
          showToast('success', "The file was successfully uploaded. Please click on the black icon to save your work.");
          disableIconTemporarily(); // Désactiver l'icône pendant 1 minute après l'upload
        } else {
          setUploadStatus('File upload failed.');
          showToast('error', "Échec du téléchargement du fichier.");
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
        setUploadStatus('Erreur lors du téléchargement.');
        showToast('error', "Error while downloading. Please try again.");
      } finally {
        setLoading(false); // Arrêter l'animation de chargement après l'envoi
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <form className="flex flex-col space-y-4">
        <label className="text-sm font-medium">3- Download your LinkedIn profile in PDF format:</label>
        <div className="relative flex items-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="animate-spin h-4 w-4 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </form>

      {uploadStatus && <p className="text-sm text-center text-green-600 mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
