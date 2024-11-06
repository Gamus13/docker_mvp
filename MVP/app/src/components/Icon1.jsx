// import React from 'react';
// import { MdHome } from 'react-icons/md';
// import { usePdfContext } from '../contexts/PdfContext';
// import '../index.css';

// const Icon1 = () => {
//     const { fetchPdf } = usePdfContext();

//     const handleLoadDocument = async () => {
//         await fetchPdf(); // Récupérer le PDF
//     };

//     return (
//         <div className="icon" title="View the document" onClick={handleLoadDocument}>
//             <MdHome />
//         </div>
//     );
// };

// export default Icon1;

import React from 'react';
import { MdVisibility } from 'react-icons/md'; // Icône en forme d'œil
import { usePdfContext } from '../contexts/PdfContext';
import '../index.css';

const Icon1 = () => {
    const { fetchPdf } = usePdfContext();

    const handleLoadDocument = async () => {
        await fetchPdf(); // Récupérer le PDF
    };

    return (
        <div className="icon" title="View the document" onClick={handleLoadDocument}>
            <MdVisibility />
        </div>
    );
};

export default Icon1;
