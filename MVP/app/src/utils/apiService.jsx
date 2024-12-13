import axios from '../axios';

// Supposons que votre instance Axios soit configurée pour pointer vers la base URL de votre API

export const storeDocument = async (formData) => {
  try {
    const response = await axios.post('/documents', formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Gère l'erreur selon tes besoins dans ton front-end
  }
};


export const stripeCheckout = async (product, price) => {
  try {
      const response = await axios.post('/stripe/checkout', { product, price });
      return response.data;
  } catch (error) {
      console.error(error);
      throw error; // Remonter l'erreur pour une gestion plus poussée dans le composant React
  }
};


// requettes pour envoyer l'image de profile
  
export const uploadProfilePhoto = async (formData) => {
  try {
    const response = await axios.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Indique à Axios que c'est un envoi de fichier
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Optionnel : remonter l'erreur pour une gestion plus poussée dans le composant React
  }
};

// requette pour recuperer l'image de profile
export const fetchProfilePhoto = async () => {
  try {
    const response = await axios.get('/profile/photo');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Optionnel : remonter l'erreur pour une gestion plus poussée dans le composant React
  }
};

export const streamingChat = async (id, question) => {
  try {
    const response = await axios.get(`/streaming/${id}`, {
      params: { question }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutSuccessStripe = async (session_id) => {
  try {
    const response = await axios.get('/stripe/checkout/success', {
      params: { session_id }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Optionnel : remonter l'erreur pour une gestion plus poussée dans le composant React
  }
};
