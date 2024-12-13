import React, { useState, useEffect } from 'react';
import { MdVisibility } from 'react-icons/md'; 
import { useUploadContext } from '../contexts/UploadContext'; // Importer le hook du contexte
import { usePdfContext } from '../contexts/PdfContext';
import { useToast } from '../contexts/ToastContext';
import '../index.css';

const Icon1 = () => {
    const { isIconClickable } = useUploadContext(); // Accéder au contexte pour savoir si l'icône est cliquable
    const [isLoading, setIsLoading] = useState(false);
    const { fetchPdf } = usePdfContext();
    const showToast = useToast(); // Utilisez uniquement showToast


    useEffect(() => {
        
        if (!isIconClickable) {
            setIsLoading(true); // Lancer l'animation lorsque l'icône n'est pas cliquable
            showToast('info', "your document is being generated and will be available at the end of the loading");
        } else {
            setIsLoading(false); // Arrêter l'animation lorsque l'icône devient cliquable
        }
    }, [isIconClickable]);

    // const handleLoadDocument = async () => {
    //     if (isIconClickable) {
    //         console.log("Loading the document...");
    //     }
    // };

    const handleLoadDocument = async () => {
        await fetchPdf(); // Récupérer le PDF
    };


    return (
        <div 
            className={`flex items-center space-x-2 ${!isIconClickable ? 'cursor-not-allowed opacity-50' : ''}`} 
            title={isIconClickable ? "View the document" : "Loading..."} 
        >
            {isLoading && (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ color: 'sky' }} // Bleu personnalisé
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
            )}
            <div 
                className="icon" 
                title="View the document"
                onClick={handleLoadDocument}
            >
                <MdVisibility />
            </div>
        </div>
    );
};

export default Icon1;
