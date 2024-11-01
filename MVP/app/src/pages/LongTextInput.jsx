import { useState } from 'react';
import axios from '../axios'; // Assurez-vous que ce chemin est correct

const LongTextInput = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Utiliser pour stocker la sélection

  // Liste des options disponibles
  const documentTypes = [
    'Contrat',
    'Lettre de motivation',
    'Permission',
    'Devis',
    'Facture',
    'Rapport',
    'Procès-verbal',
    'Convention',
    'Attestation',
    'Certificat',
    'Bulletin de salaire',
    'Bon de commande',
    'Bon de livraison',
    'Contrat de travail',
    'Lettre de recommandation',
    'Lettre de démission',
    'Lettre de licenciement',
    'Lettre de rappel',
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
      try {
        // Envoyer la requête POST avec Axios
        const response = await axios.post('/objet-document', {
          document_type: selectedValue, // Envoyer la valeur sélectionnée
        });

        // Traitement de la réponse, par exemple afficher un message de succès
        console.log('Réponse du serveur:', response.data);
      } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="flex flex-col space-y-4">
        <label className="text-sm font-medium">Choose the document type :</label>
        <select
          value={selectedOption}
          onChange={handleSelection} // Déclencher l'envoi sur le changement d'option
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
      </form>
    </div>
  );
};

export default LongTextInput;
