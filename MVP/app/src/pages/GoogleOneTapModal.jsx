

// import { useEffect, useState } from 'react';
// import { useGoogleOneTapLogin } from '@react-oauth/google';
// import axios from '../axios'; // Assurez-vous d'avoir axios installé
// import { jwtDecode } from 'jwt-decode'; // Assurez-vous d'utiliser la bonne importation
// import { useAuth } from '../contexts/AuthContext'; // Importation du contexte d'authentification

// const GoogleOneTapModal = () => {
//   const { addUser } = useAuth();
//   const [users, setUsers] = useState([]);

//   useGoogleOneTapLogin({
//     onSuccess: async (credentialResponse) => {
//        console.log('Login Success:', credentialResponse);

//       try {
//         const email = extractEmailFromToken(credentialResponse.credential);
//         if (email) {
//           const userInfo = { email };
//            console.log('User Info:', userInfo);
//           addUser(userInfo); // Ajout de l'utilisateur via le contexte d'authentification
//           setUsers(prevUsers => [...prevUsers, userInfo]); // Mettre à jour l'état local des utilisateurs
//           await saveUsersInfoAsJSON(userInfo); // Enregistrer les informations utilisateur
//         }
//       } catch (error) {
//         console.error('Error processing user information:', error);
//       }
//     },
//     onError: (error) => console.error('Login Failed:', error),
//     auto_select: true,
//   });

//   useEffect(() => {
//     console.log('Updated Users:', users);
//     // Exécuter lorsque les utilisateurs sont mis à jour
//   }, [users]);

//   const extractEmailFromToken = (token) => {
//     try {
//       const decodedToken = jwtDecode(token);
//        console.log('Decoded Token:', decodedToken); // Message de débogage
//       return decodedToken.email;
//     } catch (error) {
//       console.error('Failed to decode token:', error);
//       return null;
//     }
//   };

//   // const saveUsersInfoAsJSON = async (userInfo) => {
//   //   try {
//   //     const apiUrl = 'https://houbla-backend.vercel.app/api/save-json'; // URL correcte du backend
//   //     // console.log('API URL:', apiUrl);  // Vérifiez l'URL dans la console
//   //     const response = await axios.post(apiUrl, userInfo, {
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       }
//   //     });
//   //     console.log('Save response:', response.data);
//   //   } catch (error) {
//   //     console.error('Error saving data:', error);
//   //   }
//   // };
//   const saveUsersInfoAsJSON = async (userInfo) => {
//     try {
//       // URL du backend local (adaptez le port si nécessaire)
//       const apiUrl = 'http://localhost/api/google-login'; 
      
//       const response = await axios.post(apiUrl, {
//         name: userInfo.name,        // Envoi du nom de l'utilisateur
//         email: userInfo.email,      // Envoi de l'email
//         googleId: userInfo.sub      // Envoi de l'identifiant Google
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       // Affichage de la réponse du serveur pour confirmation
//       console.log('Save response:', response.data);
  
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };
  
  

//   return null;
// };

// export default GoogleOneTapModal;

import { useEffect, useState } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import axios from '../axios'; // Assurez-vous d'avoir axios installé
import { jwtDecode } from 'jwt-decode'; // Assurez-vous d'utiliser la bonne importation
import { useAuth } from '../contexts/AuthContext'; // Importation du contexte d'authentification

const GoogleOneTapModal = () => {
  const { addUser } = useAuth();
  const [users, setUsers] = useState([]);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Login Success:', credentialResponse);

      try {
        // Extraire les informations complètes (email, nom, sub) du token
        const decodedToken = extractInfoFromToken(credentialResponse.credential);

        if (decodedToken) {
          const userInfo = {
            email: decodedToken.email,  // Email de l'utilisateur
            name: decodedToken.name,    // Nom de l'utilisateur
            googleId: decodedToken.sub  // Identifiant Google (sub)
          };
          
          console.log('User Info:', userInfo);
          
          addUser(userInfo); // Ajout de l'utilisateur via le contexte d'authentification
          setUsers(prevUsers => [...prevUsers, userInfo]); // Mettre à jour l'état local des utilisateurs
          
          await saveUsersInfoAsJSON(userInfo); // Enregistrer les informations utilisateur dans le backend
        }
      } catch (error) {
        console.error('Error processing user information:', error);
      }
    },
    onError: (error) => console.error('Login Failed:', error),
    auto_select: true,
  });

  useEffect(() => {
    console.log('Updated Users:', users);
    // Exécuter lorsque les utilisateurs sont mis à jour
  }, [users]);

  // Extraire le nom, l'email et l'identifiant Google depuis le token
  const extractInfoFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Message de débogage
      
      return {
        email: decodedToken.email,
        name: decodedToken.name,   // Extraire le nom
        sub: decodedToken.sub      // Extraire l'ID Google (sub)
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  // Envoyer les informations de l'utilisateur au backend
  const saveUsersInfoAsJSON = async (userInfo) => {
    try {
      const apiUrl = 'http://localhost/api/google-login'; // URL locale vers le backend Laravel

      const response = await axios.post(apiUrl, {
        name: userInfo.name,       // Envoi du nom
        email: userInfo.email,     // Envoi de l'email
        googleId: userInfo.googleId // Envoi de l'identifiant Google (sub)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Save response:', response.data); // Affichage de la réponse du serveur

    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return null;
};

export default GoogleOneTapModal;
