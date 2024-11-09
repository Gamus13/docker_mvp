
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { MdInsertDriveFile } from 'react-icons/md';
import PdfViewer from './PdfViewer';
import { usePdfContext } from '../contexts/PdfContext'; // Importez le contexte PdfContext
import '../index.css';

const Icon2 = () => {
    const [pdfs, setPdfs] = useState([]); // État pour stocker les PDFs
    const [userId, setUserId] = useState(null); // État pour stocker l'ID de l'utilisateur connecté
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la modal
    const [currentIndex, setCurrentIndex] = useState(0); // Index du PDF actuellement affiché

    // Utilisation du contexte
    const { handleSelectModel } = usePdfContext();

    useEffect(() => {
        // Récupère les informations de l'utilisateur connecté
        axios.get('/user')
            .then(response => {
                const user = response.data;
                setUserId(user.id); // Stocke l'ID de l'utilisateur
                return axios.get(`/pdfs/user/${user.id}`); // Utilise l'ID pour récupérer les PDFs
            })
            .then(response => {
                setPdfs(response.data); // Stocke les PDFs récupérés dans l'état
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des PDFs :", error);
            });
    }, []);

    // Fonction pour ouvrir ou fermer la modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Fonction pour changer de PDF en fonction de l'index
    const handlePdfChange = (index) => {
        setCurrentIndex(index);
    };

    // Fonction pour sélectionner un modèle et mettre à jour `pdfPath` dans le contexte
    const selectModel = () => {
        const selectedPdfPath = `http://localhost/storage/documents/${pdfs[currentIndex].name}`;
        handleSelectModel(selectedPdfPath); // Met à jour le contexte avec le PDF sélectionné
        setIsModalOpen(false); // Ferme la modal après la sélection
    };

    return (
        <div>
            {/* Icône pour ouvrir la modal */}
            <div className="icon" title="All document templates" onClick={toggleModal}>
                <MdInsertDriveFile />
            </div>  
            
            {/* Modal pour afficher les PDFs avec pagination */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={toggleModal}>X</button>
                        <h2 className='mb-4'>choose from all its models</h2>
                        
                        {/* Affiche le PDF actuellement sélectionné */}
                        {pdfs.length > 0 && (
                            <PdfViewer 
                                src={`http://localhost/storage/documents/${pdfs[currentIndex].name}`} 
                                width="105%" 
                                height="420px" 
                            />
                        )}

                        {/* Pagination avec des ronds pour chaque PDF */}
                        <div className="pagination">
                            {pdfs.map((_, index) => (
                                <span 
                                    key={index} 
                                    className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => handlePdfChange(index)}
                                ></span>
                            ))}
                        </div>

                        {/* Bouton "Choisir ce modèle" */}
                        <div className="choose-button-container">
                            <button 
                                className="choose-button" 
                                onClick={selectModel} // Utilise la fonction `selectModel`
                            >
                                Choose this model
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Icon2;
