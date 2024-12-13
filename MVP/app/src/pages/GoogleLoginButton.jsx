// src/components/GoogleLoginButton.js
import React from 'react';
import axios from '../axios';

const GoogleLoginButton = () => {
    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost/api/google/redirect');
            window.location.href = response.data.url; // Rediriger vers l'URL de Google
        } catch (error) {
            console.error('Erreur lors de la redirection vers Google:', error);
        }
    };

    return (
        <button onClick={handleLogin} className="btn btn-primary">
            Login with Google
        </button>
    );
};

export default GoogleLoginButton;
