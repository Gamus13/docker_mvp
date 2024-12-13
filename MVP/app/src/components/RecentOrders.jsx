// import React, { useEffect, useState } from 'react';
// import { format } from 'date-fns';
// import { Link } from 'react-router-dom';
// import axios from '../axios';

// export default function RecentOrders() {
//     const [userData, setUserData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get('/user-greeting');
//                 const userResource = await axios.get('/user');

//                 // Transform data to match the required format
//                 const userInformation = [
//                     {
//                         id: 1,
//                         document_type: response.data.last_document || null,
//                         name: `${response.data.name}`,
//                         last_visit: response.data.last_visit || null,
//                         visit_count: response.data.visit_count || null,
//                         feedback: 'No feedback available', // Placeholder feedback
//                         status_paiement: 'Unknown', // Placeholder status
//                     },
//                 ];

//                 // Merge the userResource information if needed (demonstration purpose)
//                 console.log(userResource.data);

//                 setUserData(userInformation);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
//             <strong className="text-gray-700 font-medium">Recent Orders</strong>
//             <div className="border-x border-gray-200 rounded-sm mt-3 overflow-auto">
//                 <table className="w-full text-gray-700">
//                     <thead>
//                         <tr>
//                             <th className="px-4 py-2 border">ID</th>
//                             <th className="px-4 py-2 border">Document Type</th>
//                             <th className="px-4 py-2 border">Noms du Users</th>
//                             <th className="px-4 py-2 border">Last Visit</th>
//                             <th className="px-4 py-2 border">nombre de visite</th>
//                             <th className="px-4 py-2 border">Feedback</th>
//                             <th className="px-4 py-2 border">Status Paiement</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {userData.map((user, index) => (
//                             <tr key={index}>
//                                 <td className="px-4 py-2 border">{index + 1}</td>
//                                 <td className="px-4 py-2 border">{user.last_document || 'Null'}</td>
//                                 <td className="px-4 py-2 border">{user.name }</td>
//                                 <td className="px-4 py-2 border">
//                                     {user.last_visit
//                                         ? format(new Date(user.last_visit), 'dd MMM yyyy')
//                                         : 'Null'}
//                                 </td>
//                                 <td className="px-4 py-2 border">{user.visit_count || 'Null'}</td>
//                                 <td className="px-4 py-2 border">{user.feedback}</td>
//                                 <td className="px-4 py-2 border">{user.status_paiement}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from '../axios';

export default function RecentOrders() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/alluser-greeting');

                // Transformez les données pour inclure des champs supplémentaires
                const userInformation = response.data.map((user, index) => ({
                    id: index + 1, // Crée un ID basé sur l'index
                    document_type: user.last_document || 'Null',
                    name: user.name,
                    last_visit: user.last_visit || 'Null',
                    visit_count: user.visit_count || 0,
                    feedback: 'No feedback available', // Placeholder feedback
                    status_paiement: 'Unknown', // Placeholder status
                }));

                setUserData(userInformation);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3 overflow-auto">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Document Type</th>
                            <th className="px-4 py-2 border">Noms du Users</th>
                            <th className="px-4 py-2 border">Last Visit</th>
                            <th className="px-4 py-2 border">Nombre de Visites</th>
                            <th className="px-4 py-2 border">Feedback</th>
                            <th className="px-4 py-2 border">Status Paiement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.id}>
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.document_type}</td>
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">
                                    {user.last_visit !== 'Null'
                                        ? format(new Date(user.last_visit), 'dd MMM yyyy')
                                        : 'Null'}
                                </td>
                                <td className="px-4 py-2 border">{user.visit_count}</td>
                                <td className="px-4 py-2 border">{user.feedback}</td>
                                <td className="px-4 py-2 border">{user.status_paiement}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
