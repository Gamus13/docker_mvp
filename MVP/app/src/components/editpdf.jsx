
// import React, { useRef, useEffect, useState } from 'react';
// import WebViewer from '@pdftron/webviewer';
// import axios from '../axios';
// import '../index.css'; // Assurez-vous que ce fichier existe pour appliquer le style

// function Editpdf({ onLoad }) {  // Ajout de la prop onLoad
//   const viewerDiv = useRef(null);
//   const [pdfPath, setPdfPath] = useState(''); // État pour stocker le chemin du PDF

//   useEffect(() => {
//     // Fonction pour récupérer le PDF
//     const fetchPdf = async () => {
//       try {
//         const response = await axios.get('/pdfs'); // Requête pour récupérer les PDF
//         if (response.data.length > 0) {
//           // Supposons que vous voulez afficher le premier PDF
//           setPdfPath(response.data[0].path); // Mettre à jour l'état avec le chemin du PDF
//         } else {
//           // Si aucun PDF n'est retourné, utiliser le PDF par défaut
//           setPdfPath('https://dp-www.s3.ensam.eu/public/2016-11/pdf.pdf');
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des PDF:', error);
//         // En cas d'erreur, utiliser également le PDF par défaut
//         setPdfPath('https://dp-www.s3.ensam.eu/public/2016-11/pdf.pdf');
//       }
//     };

//     fetchPdf(); // Appeler la fonction pour récupérer le PDF

//     // Initialiser WebViewer après avoir récupéré le PDF
//     const initWebViewer = async () => {
//       if (pdfPath) {
//         try {
//           const instance = await WebViewer(
//             {
//               path: '/app/lib',
//               licenseKey: 'demo:1727982776616:7e0d46050300000000069945db1215cb9199db6bd71565c5d7f70dc82f', // Remplacez avec votre clé de licence
//               initialDoc: pdfPath, // Utiliser le chemin du PDF récupéré
//             },
//             viewerDiv.current // Attache la visionneuse au div
//           );

//           instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]); // Active les outils d'édition de contenu PDF

//           // Appeler le callback onLoad une fois que WebViewer est prêt
//           if (onLoad) {
//             onLoad();  // Indiquer que le composant est chargé
//           }
//         } catch (err) {
//           console.error('Erreur lors de l\'initialisation de WebViewer', err);
//         }
//       }
//     };

//     initWebViewer(); // Appeler la fonction pour initialiser WebViewer

//   }, [pdfPath, onLoad]); // Ajout de onLoad comme dépendance

//   return (
//     <>
//       {/* Div qui contiendra l'interface WebViewer */}
//       <div className="webviewer" ref={viewerDiv}></div>
//     </>
//   );
// }

// export default Editpdf;

// import React, { useRef, useEffect, useState } from 'react';
// import WebViewer from '@pdftron/webviewer';
// import axios from '../axios';
// import '../index.css';

// function Editpdf({ onLoad }) {
//   const viewerDiv = useRef(null);
//   const [pdfPath, setPdfPath] = useState('');

//   useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         const response = await axios.get('/pdfs');
//         if (response.data.length > 0) {
//           setPdfPath(response.data[0].path);
//         } else {
//           setPdfPath('https://dp-www.s3.ensam.eu/public/2016-11/pdf.pdf');
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des PDF:', error);
//         setPdfPath('https://dp-www.s3.ensam.eu/public/2016-11/pdf.pdf');
//       }
//     };

//     fetchPdf();

//     const initWebViewer = async () => {
//       if (pdfPath) {
//         try {
//           const instance = await WebViewer(
//             {
//               path: '/app/lib',
//               licenseKey: 'demo:1727982776616:7e0d46050300000000069945db1215cb9199db6bd71565c5d7f70dc82f',
//               initialDoc: pdfPath,
//             },
//             viewerDiv.current
//           );

//           const { documentViewer, annotationManager } = instance.Core;

//           instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);

//           instance.UI.setHeaderItems(header => {
//             header.push({
//               type: 'actionButton',
//               img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7zEC125CqFW2thjHD9JbTzksfADo_lPXFQ&s', // Remplacez par le chemin de votre icône
//               title: 'Save PDF',
//               onClick: async () => {
//                 const doc = documentViewer.getDocument();
//                 const xfdfString = await annotationManager.exportAnnotations();
//                 const data = await doc.getFileData({
//                   xfdfString,
//                   downloadType: 'pdf',
//                 });

//                 const arr = new Uint8Array(data);
//                 const blob = new Blob([arr], { type: 'application/pdf' });

//                 // Créer un FormData pour envoyer le blob
//                 const formData = new FormData();
//                 formData.append('file', blob, 'downloaded.pdf'); // 'file' est le nom du champ à envoyer

//                 // Envoyer le blob au serveur via axios
//                 try {
//                   const response = await axios.post('/upload', formData, {
//                     headers: {
//                       'Content-Type': 'multipart/form-data', // Indiquer le type de contenu
//                     },
//                   });
//                   console.log('Fichier envoyé avec succès:', response.data);
//                 } catch (error) {
//                   console.error('Erreur lors de l\'envoi du fichier:', error);
//                 }
//               },
//             });
//           });

//           if (onLoad) {
//             onLoad();
//           }
//         } catch (err) {
//           console.error('Erreur lors de l\'initialisation de WebViewer', err);
//         }
//       }
//     };

//     initWebViewer();
//   }, [pdfPath, onLoad]);

//   return (
//     <>
//       <div className="webviewer" ref={viewerDiv} style={{ width: '100%', height: '100vh' }}></div>
//     </>
//   );
// }

// export default Editpdf;

import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { usePdfContext } from '../contexts/PdfContext'; 
import '../index.css';
import axios from '../axios';
import { useToast } from '../contexts/ToastContext';

function Editpdf({ onLoad }) {
  const viewerDiv = useRef(null);
  const { pdfPath, loading } = usePdfContext(); 
  const [instance, setInstance] = useState(null);
  const showToast = useToast(); // Utilisez uniquement showToast

  useEffect(() => {
    const initWebViewer = async () => {
      if (viewerDiv.current && !instance) {
        try {
          const newInstance = await WebViewer(
            {
              path: '/app/lib',
              licenseKey: 'demo:1727982776616:7e0d46050300000000069945db1215cb9199db6bd71565c5d7f70dc82f',
              initialDoc: '', // Initialiser sans document
            },
            viewerDiv.current
          );

          setInstance(newInstance);
          newInstance.UI.enableFeatures([newInstance.UI.Feature.ContentEdit]);

          newInstance.UI.setHeaderItems(header => {
            header.push({
              type: 'actionButton',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7zEC125CqFW2thjHD9JbTzksfADo_lPXFQ&s', 
              title: 'Save the generated document',
              onClick: async () => {
                const doc = newInstance.Core.documentViewer.getDocument();
                const xfdfString = await newInstance.Core.annotationManager.exportAnnotations();
                const data = await doc.getFileData({
                  xfdfString,
                  downloadType: 'pdf',
                });
                showToast('success', "By clicking the button you have successfully saved your work and you can now send it. Click the <-- BACK button to do so.");
                const arr = new Uint8Array(data);
                const blob = new Blob([arr], { type: 'application/pdf' });
                const formData = new FormData();
                formData.append('file', blob, 'downloaded.pdf'); 

                try {
                  const response = await axios.post('/upload', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data', 
                    },
                  });
                  console.log('Fichier envoyé avec succès:', response.data);
                } catch (error) {
                  console.error('Erreur lors de l\'envoi du fichier:', error);
                }
              },
            });
          });

          if (onLoad) {
            onLoad();
          }
        } catch (err) {
          console.error('Erreur lors de l\'initialisation de WebViewer', err);
        }
      }
    };

    initWebViewer();
  }, [instance, onLoad]);

  useEffect(() => {
    if (instance && pdfPath) {
      // Charger le document en utilisant Core.documentViewer
      instance.Core.documentViewer.loadDocument(pdfPath); // Mise à jour ici
    }
  }, [pdfPath, instance]);

  return (
    // <div>
    //   <div className="webviewer" ref={viewerDiv} style={{ width: '100%', height: '100vh' }}></div>
    // </div>
    <div className="relative w-full h-screen"> {/* Conteneur pour positionnement relatif */}
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10"> {/* Positionnement absolu */}
          {/* Animation de chargement */}
          <div className="loaderx">Loading...</div> {/* Remplacez cela par votre animation */}
        </div>
      ) : (
        <div className="webviewer" ref={viewerDiv} style={{ width: '100%', height: '100vh' }}></div>
      )}
    </div>
  );
}

export default Editpdf;



