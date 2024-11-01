

// import React, { useState } from 'react';

// const PdfUpdateForm = () => {
//     const [products, setProducts] = useState([
//         { service: '', description: '', rate: '', quantity: '', amount: '' }
//     ]);

//     // Fonction pour gérer les changements dans chaque champ d’un produit
//     const handleProductChange = (index, event) => {
//         const { name, value } = event.target;
//         const updatedProducts = [...products];
//         updatedProducts[index][name] = value;
//         setProducts(updatedProducts);
//     };

//     // Ajouter un nouvel ensemble de champs produit
//     const addProduct = () => {
//         setProducts([...products, { service: '', description: '', rate: '', quantity: '', amount: '' }]);
//     };

//     // Supprimer un ensemble de champs produit
//     const removeProduct = (index) => {
//         const updatedProducts = products.filter((_, i) => i !== index);
//         setProducts(updatedProducts);
//     };

//     // Envoyer le formulaire
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Logique de soumission
//         console.log('Produits envoyés:', products);
//     };

//     return (
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             {products.map((product, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     <input
//                         type="text"
//                         name="service"
//                         value={product.service}
//                         onChange={(e) => handleProductChange(index, e)}
//                         placeholder="Service"
//                         style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }} // Ajout de couleurs
//                     />
//                     <input
//                         type="text"
//                         name="description"
//                         value={product.description}
//                         onChange={(e) => handleProductChange(index, e)}
//                         placeholder="Description"
//                         style={{ padding: '5px', flex: 2, backgroundColor: '#f0f0f0', color: '#333' }} // Ajout de couleurs
//                     />
//                     <input
//                         type="text"
//                         name="rate"
//                         value={product.rate}
//                         onChange={(e) => handleProductChange(index, e)}
//                         placeholder="Rate"
//                         style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }} // Ajout de couleurs
//                     />
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={product.quantity}
//                         onChange={(e) => handleProductChange(index, e)}
//                         placeholder="Quantity"
//                         style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }} // Ajout de couleurs
//                     />
//                     <input
//                         type="text"
//                         name="amount"
//                         value={product.amount}
//                         onChange={(e) => handleProductChange(index, e)}
//                         placeholder="Amount"
//                         style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }} // Ajout de couleurs
//                     />
                    
//                     {/* Bouton - pour supprimer un produit */}
//                     <button
//                         type="button"
//                         onClick={() => removeProduct(index)}
//                         style={{
//                             padding: '5px 10px',
//                             backgroundColor: '#f44336',
//                             color: 'white',
//                             border: 'none',
//                             cursor: 'pointer',
//                             flexShrink: 0 // Évite que le bouton rétrécisse
//                         }}
//                     >
//                         -
//                     </button>
//                 </div>
//             ))}

//             {/* Bouton pour ajouter un nouveau produit */}
//             <button
//                 type="button"
//                 onClick={addProduct}
//                 style={{
//                     padding: '5px 10px',
//                     margin: '10px 0',
//                     backgroundColor: '#4CAF50',
//                     color: 'white',
//                     border: 'none',
//                     cursor: 'pointer',
//                     flexShrink: 0 // Évite que le bouton rétrécisse
//                 }}
//             >
//                 Ajouter un produit
//             </button>

//             {/* Bouton d'envoi du formulaire */}
//             <button type="submit" style={{ padding: '10px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>
//                 Envoyer
//             </button>
//         </form>
//     );
// };

// export default PdfUpdateForm;

import React, { useEffect, useState } from 'react';
import axios from '../axios';

const PdfUpdateForm = () => {
    const [products, setProducts] = useState([
        { service: '', description: '', rate: '', quantity: '', amount: '' }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState(null); // State to hold the user ID

    // Fetch the user ID when the component mounts
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/user');
                setUserId(response.data.id); // Adjust according to your API response structure
            } catch (err) {
                console.error('Erreur lors de la récupération de l\'ID utilisateur:', err);
                setError('Erreur lors de la récupération de l\'ID utilisateur.');
            }
        };

        fetchUserId();
    }, []);

    // Fonction pour gérer les changements dans chaque champ d’un produit
    const handleProductChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProducts = [...products];
        updatedProducts[index][name] = value;
        setProducts(updatedProducts);
    };

    // Ajouter un nouvel ensemble de champs produit
    const addProduct = () => {
        setProducts([...products, { service: '', description: '', rate: '', quantity: '', amount: '' }]);
    };

    // Supprimer un ensemble de champs produit
    const removeProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    // Envoyer le formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Vérifier si userId est défini avant d'envoyer la requête
            if (!userId) {
                setError('ID utilisateur non disponible. Veuillez réessayer.');
                return;
            }

            // Envoyer les données via l'API
            const response = await axios.post(`/update-pdf/${userId}`, { items: products });

            // Gérer la réponse de l'API
            console.log('Réponse de l\'API:', response.data);
            setSuccessMessage('Données mises à jour avec succès.');
        } catch (err) {
            console.error('Erreur lors de l\'envoi des données:', err);
            setError('Erreur lors de la mise à jour des données. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((product, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="text"
                        name="service"
                        value={product.service}
                        onChange={(e) => handleProductChange(index, e)}
                        placeholder="Service"
                        style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }}
                    />
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={(e) => handleProductChange(index, e)}
                        placeholder="Description"
                        style={{ padding: '5px', flex: 2, backgroundColor: '#f0f0f0', color: '#333' }}
                    />
                    <input
                        type="text"
                        name="rate"
                        value={product.rate}
                        onChange={(e) => handleProductChange(index, e)}
                        placeholder="Rate"
                        style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }}
                    />
                    <input
                        type="text"
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, e)}
                        placeholder="Quantity"
                        style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }}
                    />
                    <input
                        type="text"
                        name="amount"
                        value={product.amount}
                        onChange={(e) => handleProductChange(index, e)}
                        placeholder="Amount"
                        style={{ padding: '5px', flex: 1, backgroundColor: '#f0f0f0', color: '#333' }}
                    />

                    <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            flexShrink: 0
                        }}
                    >
                        -
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addProduct}
                style={{
                    padding: '5px 10px',
                    margin: '10px 0',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0
                }}
            >
                Ajouter un produit
            </button>

            <button 
                type="submit" 
                style={{ padding: '10px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}
                disabled={loading}
            >
                {loading ? 'Envoi...' : 'Envoyer'}
            </button>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        </form>
    );
};

export default PdfUpdateForm;

