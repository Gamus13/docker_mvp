import { useState } from 'react';
import axios from '../axios';
import { useToast } from '../contexts/ToastContext';
import { useVisibilityContext } from '../contexts/VisibilityContext';

const LongTextInput = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const { setIcon3Visibility } = useVisibilityContext();

  const documentTypes = [
    'Contrat de travail', 'Lettre de demande de stage', 'Devis', 'Facture','Lettre de licenciement' ,
    // 'Bon de commande','Bon de livraison','Contrat' , 'Lettre de recommandation', 'Lettre de démission',
    // , 'Lettre de relance', 'Lettre de réclamation', 'Lettre de remerciement',
    // 'Lettre de demande de congé','Lettre de motivation' , 'Lettre de demande de subvention', 
  ];

  const handleSelection = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    // Met à jour la visibilité d'Icon3 en fonction de la sélection
    if (selectedValue === 'Devis' || selectedValue === 'Facture') {
      setIcon3Visibility(true);
    } else {
      setIcon3Visibility(false);
    }

    if (selectedValue) {
      setLoading(true);
      showToast('info', 'You have started generating your document. Please wait...');
      try {
        const response = await axios.post('/objet-document', { document_type: selectedValue });
        showToast('success', 'The document type has been selected successfully. You can proceed to step 2.');
      } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error);
        showToast('error', "Oops, something went wrong. Please try again.");
      } finally {
        setLoading(false);
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
            onChange={handleSelection}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full"
          >
            <option value="" className="text-black">Select a document type</option>
            {documentTypes.map((type, index) => (
              <option key={index} value={type} className="text-black">{type}</option>
            ))}
          </select>
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="animate-spin h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LongTextInput;
