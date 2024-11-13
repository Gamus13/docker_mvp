// // import React, { useState, useEffect } from 'react';
// // import PaymentSuccessConfetti from './PaymentSuccessConfetti';

// // const ProfilePage = () => {
// //   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

// //   useEffect(() => {
// //     // Récupérer le statut du paiement depuis l'URL
// //     const urlParams = new URLSearchParams(window.location.search);
// //     const paymentStatus = urlParams.get('payment_status'); // récupérer le statut du paiement via l'URL

// //     if (paymentStatus === 'success') {
// //       setIsPaymentSuccess(true);
// //     }
// //   }, []);

// //   return (
// //     <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
// //       {/* Afficher les confettis si le paiement a réussi */}
// //       {isPaymentSuccess && <PaymentSuccessConfetti isPaymentSuccess={isPaymentSuccess} />}
      
// //       <h1 className="text-3xl font-bold mb-4">Bienvenue sur votre profil</h1>
// //       <p className="text-xl text-center">Votre paiement a été effectué avec succès !</p>
// //     </div>
// //   );
// // };

// // export default ProfilePage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PaymentSuccessConfetti from './PaymentSuccessConfetti';

// const ProfilePage = () => {
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Logique de récupération du statut du paiement depuis l'URL (si nécessaire)
//     const urlParams = new URLSearchParams(window.location.search);
//     const paymentStatus = urlParams.get('payment_status'); // récupérer le statut du paiement via l'URL

//     if (paymentStatus === 'success') {
//       setIsPaymentSuccess(true);
//     }
//   }, []);

//   // Fonction de redirection
//   const handleButtonClick = () => {
//     navigate('/app/generate');
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
//       {/* Afficher les confettis tout le temps */}
//       <PaymentSuccessConfetti isPaymentSuccess={true} />

//       {/* Titre avec icône */}
//       <h1 className="text-3xl font-bold mb-4 flex items-center">
//         <span className="text-green-500 mr-2">😊</span>
//         Welcome to the DocxTalk family
//       </h1>

//       <p className="text-xl text-center mb-6">
//         You now have a 30-day free trial, which you can cancel at any time!
//       </p>

//       {/* Ajouter le bouton avec redirection */}
//       <button
//         onClick={handleButtonClick}
//         className="px-6 py-2 bg-sky-700 text-white font-bold hover:bg-sky-600 transition-colors"
//       >
//         Start your journey
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from 'react';
import axios from '../axios';

const ProfilePage = () => {
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    // Vérifier le statut du paiement
    axios.post('/check-payment-status')
      .then(response => setPaymentStatus(response.data.status))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {paymentStatus === 'succeeded' ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Bienvenue dans la famille DocxTalk 😊</h1>
          <p className="text-xl text-center">Vous disposez maintenant de 30 jours d'essai gratuit, résiliable à tout moment !</p>
        </>
      ) : paymentStatus === 'pending' ? (
        <p>Votre paiement est en cours de traitement...</p>
      ) : (
        <p>Statut de paiement non trouvé.</p>
      )}
    </div>
  );
};

export default ProfilePage;
