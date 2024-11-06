// import { useState } from 'react';
// import axios from '../axios'; // Assurez-vous que ce chemin est correct


// const LongTextInput = () => {
//   const [selectedOption, setSelectedOption] = useState(''); // Utiliser pour stocker la sélection

//   // Liste des options disponibles
//   const documentTypes = [
//     'Contrat',
//     'Lettre de motivation',
//     // 'Permission',
//     'Devis',
//     'Facture',
//     // 'Rapport',
//     // 'Procès-verbal',
//     // 'Convention',
//     // 'Attestation',
//     // 'Certificat',
//     // 'Bulletin de salaire',
//     'Bon de commande',
//     'Bon de livraison',
//     'Contrat de travail',
//     'Lettre de recommandation',
//     'Lettre de démission',
//     'Lettre de licenciement',
//     // 'Lettre de rappel',
//     'Lettre de relance',
//     'Lettre de réclamation',
//     'Lettre de remerciement',
//     'Lettre de demande de congé',
//     'Lettre de demande de stage',
//     'Lettre de demande de subvention',
//   ];

//   // Fonction pour envoyer les données lorsqu'une option est sélectionnée
//   const handleSelection = async (e) => {
//     const selectedValue = e.target.value;
//     setSelectedOption(selectedValue); // Mettre à jour la sélection

//     if (selectedValue) {
//       try {
//         // Envoyer la requête POST avec Axios
//         const response = await axios.post('/objet-document', {
//           document_type: selectedValue, // Envoyer la valeur sélectionnée
//         });

//         // Traitement de la réponse, par exemple afficher un message de succès
//         console.log('Réponse du serveur:', response.data);
//       } catch (error) {
//         console.error("Erreur lors de l'envoi des données:", error);
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <form className="flex flex-col space-y-4">
//         <label className="text-sm font-medium">1- Choose the document type :</label>
//         <select
//           value={selectedOption}
//           onChange={handleSelection} // Déclencher l'envoi sur le changement d'option
//           className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//         >
//           <option value="" className="text-black">
//             Select a document type
//           </option>
//           {documentTypes.map((type, index) => (
//             <option key={index} value={type} className="text-black">
//               {type}
//             </option>
//           ))}
//         </select>
//       </form>
//     </div>
//   );
// };

// export default LongTextInput;

import { useState } from 'react';
import axios from '../axios'; // Assurez-vous que ce chemin est correct
import { useToast } from '../contexts/ToastContext';

const LongTextInput = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Utiliser pour stocker la sélection
  const [loading, setLoading] = useState(false); // État de chargement
  const showToast = useToast(); // Utilisez uniquement showToast

  // Liste des options disponibles
  const documentTypes = [
    'Contrat',
    'Lettre de motivation',
    'Devis',
    'Facture',
    'Bon de commande',
    'Bon de livraison',
    'Contrat de travail',
    'Lettre de recommandation',
    'Lettre de démission',
    'Lettre de licenciement',
    'Lettre de relance',
    'Lettre de réclamation',
    'Lettre de remerciement',
    'Lettre de demande de congé',
    'Lettre de demande de stage',
    'Lettre de demande de subvention',
  ];

  // Fonction pour envoyer les données lorsqu'une option est sélectionnée
  const handleSelection = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Mettre à jour la sélection

    if (selectedValue) {
      setLoading(true); // Démarrer l'animation de chargement
      showToast('info', 'You have started generating your document. Please wait...'); // Notification de démarrage

      try {
        const response = await axios.post('/objet-document', {
          document_type: selectedValue, // Envoyer la valeur sélectionnée
        });

        // Afficher un message de succès et loguer la réponse du serveur
        console.log('Réponse du serveur:', response.data);
        showToast('success', 'The document type has been selected successfully. You can proceed to step 2.');
      } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error);
        showToast('error', "Oops, something went wrong. Please try again.");
      } finally {
        setLoading(false); // Arrêter l'animation de chargement
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <form className="flex flex-col space-y-4">
        <label className="text-sm font-medium">1- Choose the document type :</label>
        <div className="relative">
          <select
            value={selectedOption}
            onChange={handleSelection} // Déclencher l'envoi sur le changement d'option
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full"
          >
            <option value="" className="text-black">
              Select a document type
            </option>
            {documentTypes.map((type, index) => (
              <option key={index} value={type} className="text-black">
                {type}
              </option>
            ))}
          </select>

          {/* Afficher l'animation de chargement */}
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
    </div>
  );
};

export default LongTextInput;
