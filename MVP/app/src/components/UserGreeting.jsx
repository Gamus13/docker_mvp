// // ReactJS Component with Axios and Laravel Backend
// import React, { useEffect, useState } from 'react';
// import axios from '../axios';

// const UserGreeting = () => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch user data on component mount
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get('/user-greeting');
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     if (loading) return <p>Loading...</p>;

//     if (!userData) return <p>Error loading user data.</p>;

//     const { name,  last_visit, last_document, visit_count } = userData;
//     const formattedLastVisit = new Date(last_visit).toLocaleDateString();

//     let message;

//     if (visit_count === 1) {
//         message = `Bonjour Monsieur ${name} et bienvenue sur DocxTalk. prêt a generer votre tous premier document?`;
//     } else if (visit_count === 2) {
//         message = `Bonjour Monsieur ${name}. La dernière fois que nous avons travaillé ensemble remonte au ${formattedLastVisit}. Voulez-vous toujours créer votre "${last_document}"?`;
//     } else {
//         message = `Bonjour Monsieur ${name}, comment allez-vous? La dernière fois que nous avons travaillé ensemble remonte au ${formattedLastVisit}. Voulez-vous toujours créer "${last_document}"? Si c'est le cas, j'ai déjà prérempli vos informations. Vous n'avez plus qu'à cliquer sur le bouton pour personnaliser votre document, et le tour est joué.`;
//     }

//     return (
//         <div>
//             <p>{message}</p>
//             {visit_count > 2 && <button>Personnaliser votre document</button>}
//         </div>
//     );
// };

// export default UserGreeting;

import React, { useEffect, useState } from 'react';
import axios from '../axios';

const UserGreeting = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data on component mount
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/user-greeting');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    if (!userData) return <p className="text-center text-red-500">Error loading user data.</p>;

    const { name, last_visit, last_document, visit_count } = userData;
    const formattedLastVisit = new Date(last_visit).toLocaleDateString();

    let message;

    if (visit_count === 1) {
        message = `Bonjour Monsieur ${name} et bienvenue sur DocxTalk. prêt a generer votre tous premier document?`;
    } else if (visit_count === 2) {
        message = `Bonjour Monsieur ${name}. La dernière fois que nous avons travaillé ensemble remonte au ${formattedLastVisit}. Voulez-vous toujours créer votre "${last_document}"?`;
    } else {
        message = `Bonjour Monsieur ${name}, comment allez-vous? La dernière fois que nous avons travaillé ensemble remonte au ${formattedLastVisit}. Voulez-vous toujours créer "${last_document}"? Si c'est le cas, j'ai déjà prérempli vos informations. Vous n'avez plus qu'à cliquer sur le bouton pour personnaliser votre document, et le tour est joué.`;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{message}</p>
            {visit_count > 2 && (
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Personnaliser votre document
                </button>
            )}
        </div>
    );
};

export default UserGreeting;
