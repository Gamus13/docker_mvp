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
    // Animation de chargement intégrée
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Chargement en cours...</p>
      </div>
    );
  } else {
    return null; // Vous pouvez remplacer par un message ou une redirection
  }
}

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Ajout de la règle CSS pour l'animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);

export default GoogleCallback;
