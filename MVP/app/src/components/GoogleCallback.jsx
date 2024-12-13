// // src/GoogleCallback.js

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../axios"; // Assurez-vous que le chemin vers votre instance Axios est correct

// function GoogleCallback() {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState({});
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   // On page load, we take "search" parameters 
//   // and proxy them to /api/auth/callback on our Laravel API
//   useEffect(() => {
//     axios
//       .get(`/auth/callback${location.search}`)
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching callback data:", error);
//         setLoading(false);
//       });
//   }, [location.search]);

//   // Helper method to fetch User data for authenticated user
//   // Watch out for "Authorization" header that is added to this call
//   function fetchUserData() {
//     axios
//       .get(`/user`, {
//         headers: {
//           Authorization: `Bearer ${data.access_token}`,
//         },
//       })
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }

//   if (loading) {
//     return <DisplayLoading />;
//   } else {
//     if (user != null) {
//       return <DisplayData data={user} />;
//     } else {
//       return (
//         <div>
//           <DisplayData data={data} />
//           <div style={{ marginTop: 10 }}>
//             <button onClick={fetchUserData}>Fetch User</button>
//           </div>
//         </div>
//       );
//     }
//   }
// }

// function DisplayLoading() {
//   return <div>Loading....</div>;
// }

// function DisplayData({ data }) {
//   return (
//     <div>
//       <samp>{JSON.stringify(data, null, 2)}</samp>
//     </div>
//   );
// }

// export default GoogleCallback;


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "../axios"; // Assurez-vous que le chemin vers votre instance Axios est correct

// function GoogleCallback() {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState({});
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     // Récupérer les données du callback
//     axios
//       .get(`/auth/callback${location.search}`)
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching callback data:", error);
//         setLoading(false);
//       });
//   }, [location.search]);

//   useEffect(() => {
//     // Récupérer les informations de l'utilisateur une fois le token disponible
//     if (data.access_token) {
//       axios
//         .get(`/user`, {
//           headers: {
//             Authorization: `Bearer ${data.access_token}`,
//           },
//         })
//         .then((response) => {
//           setUser(response.data);
//           // Rediriger l'utilisateur après récupération des données
//           navigate("/app/profile/");
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//         });
//     }
//   }, [data.access_token, navigate]);

//   if (loading) {
//     return <DisplayLoading />;
//   } else {
//     return (
//       <div>
//         <DisplayData data={data} />
//       </div>
//     );
//   }
// }

// function DisplayLoading() {
//   return <div>Loading....</div>;
// }

// function DisplayData({ data }) {
//   return (
//     <div>
//       <samp>{JSON.stringify(data, null, 2)}</samp>
//     </div>
//   );
// }

// export default GoogleCallback;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext"; // Importer le contexte d'authentification

function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Accéder au setter du contexte utilisateur

  useEffect(() => {
    axios
      .get(`/auth/callback${location.search}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching callback data:", error);
        setLoading(false);
      });
  }, [location.search]);

  useEffect(() => {
    if (data.access_token) {
      axios
        .get(`/user`, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Met à jour le contexte utilisateur
          navigate("/app/profile/"); // Redirige après mise à jour
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [data.access_token, navigate, setUser]);

  if (loading) {
    return <DisplayLoading />;
  } else {
    return null; // Vous pouvez remplacer par un message ou une redirection
  }
}

export default GoogleCallback;
