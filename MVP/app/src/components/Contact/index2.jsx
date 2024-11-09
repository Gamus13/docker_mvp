
// import React, { useContext, useState, useEffect } from 'react';
// import axios from '../../axios';  
// import { ThemeContext } from '../../contexts/ThemeContext';
// import SectionTitle from '../Common/SectionTitle';

// const Contact2 = () => {
//   const { theme } = useContext(ThemeContext);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(true); // État de chargement

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/user');
//         if (response.status === 200) {
//           setFormData({
//             name: response.data.name,
//             email: response.data.email,
//             message: ''
//           });
//         } else {
//           setStatus("Impossible de récupérer les données de l'utilisateur.");
//         }
//       } catch (error) {
//         setStatus("Erreur lors de la récupération des données.");
//       } finally {
//         setLoading(false); // Arrêt de l'animation une fois les données récupérées
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/send-email', formData);
//       if (response.status === 200) {
//         setStatus('Message envoyé avec succès !');
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         setStatus("Quelque chose s'est mal passé. Veuillez réessayer.");
//       }
//     } catch (error) {
//       setStatus("Erreur lors de l'envoi du message.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value
//     }));
//   };

//   const sectionClasses = `overflow-hidden py-16 md:py-20 lg:py-28 ${
//     theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
//   }`;

//   const containerClasses = `mx-auto mb-12 rounded-sm px-8 py-11 shadow-lg sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] ${
//     theme === 'dark' ? 'bg-gray-800' : 'bg-white'
//   }`;

//   return (
//     <section id="contact" className={sectionClasses}>
//       <div className="container">
//         <SectionTitle
//           title="Get in Touch with Us"
//           paragraph="Having trouble? Fill out the form below and our support team will get back to you as soon as possible."
//           center
//           width="665px"
//         />
//         <div className="flex justify-center mt-12">
//           <div className="w-full lg:w-7/12 xl:w-8/12">
//             <div className={containerClasses} data-wow-delay=".15s">
//               <h2 className="mb-3 text-2xl font-bold sm:text-3xl lg:text-2xl xl:text-3xl">
//                 Describe your problem
//               </h2>
//               {/* <p className="mb-12 text-base font-medium">
//                 Our support team will get back to you ASAP via email.
//               </p> */}
//               <form onSubmit={handleSubmit}>
//                 <div className="-mx-4 flex flex-wrap">
//                   <div className="w-full px-4 md:w-1/2">
//                     <div className="mb-8 relative">
//                       <label htmlFor="name" className="mb-3 block text-sm font-medium">
//                         Your Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Enter your name"
//                         className={`border-stroke w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
//                           theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
//                         }`}
//                         required
//                       />
//                       {loading && !formData.name && (
//                         <div className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full"></div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="w-full px-4 md:w-1/2">
//                     <div className="mb-8 relative">
//                       <label htmlFor="email" className="mb-3 block text-sm font-medium">
//                         Your Email
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter your email"
//                         className={`border-stroke w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
//                           theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
//                         }`}
//                         required
//                       />
//                       {loading && !formData.email && (
//                         <div className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full"></div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="w-full px-4">
//                     <div className="mb-8 relative">
//                       <label htmlFor="message" className="mb-3 block text-sm font-medium">
//                         Your Message
//                       </label>
//                       <textarea
//                         id="message"
//                         value={formData.message}
//                         onChange={handleInputChange}
//                         rows={5}
//                         placeholder="Enter your Message"
//                         className={`border-stroke w-full resize-none rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
//                           theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
//                         }`}
//                         required
//                       ></textarea>
//                       {loading && !formData.message && (
//                         <div className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full"></div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="w-full px-4">
//                     <button
//                       type="submit"
//                       className={`rounded-sm bg-sky-400 px-9 py-4 text-white font-medium shadow-submit duration-300 hover:bg-sky-500 ${
//                         theme === 'dark' ? 'dark:shadow-submit-dark' : ''
//                       }`}
//                     >
//                       Submit
//                     </button>
//                   </div>

//                   {status && <p className="mt-4 text-sm text-green-500">{status}</p>}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact2;


import React, { useContext, useState, useEffect } from 'react';
import axios from '../../axios';  
import { ThemeContext } from '../../contexts/ThemeContext';
import SectionTitle from '../Common/SectionTitle';

const Contact2 = () => {
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user');
        if (response.status === 200) {
          setFormData({
            name: response.data.name,
            email: response.data.email,
            message: ''
          });
        } else {
          setStatus("Impossible de récupérer les données de l'utilisateur.");
        }
      } catch (error) {
        setStatus("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false); // Arrêt de l'animation une fois les données récupérées
      }
    };

    fetchUserData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Déclenche l'animation de chargement dès le clic sur le bouton Submit
    setLoading(true);
  
    try {
      const response = await axios.post('/send-email', formData);
      if (response.status === 200) {
        setStatus('Message envoyé avec succès !');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Quelque chose s'est mal passé. Veuillez réessayer.");
      }
    } catch (error) {
      setStatus("Erreur lors de l'envoi du message.");
    } finally {
      // Arrête l'animation une fois la requête terminée
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const sectionClasses = `overflow-hidden py-16 md:py-20 lg:py-28 ${
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
  }`;

  const containerClasses = `mx-auto mb-12 rounded-sm px-8 py-11 shadow-lg sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`;

  return (
    <section id="contact" className={sectionClasses}>
      <div className="container">
        <SectionTitle
          title="Get in Touch with Us"
          paragraph="We would love to hear from you. Fill out the form below and our support team will get back to you as soon as possible."
          center
          width="665px"
        />
        <div className="flex justify-center mt-12">
          <div className="w-full lg:w-7/12 xl:w-8/12">
            <div className={containerClasses} data-wow-delay=".15s">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl lg:text-2xl xl:text-3xl">
                Describe your problem
              </h2>
              <p className="mb-12 text-base font-medium">
                {/* Our support team will get back to you ASAP via email. */}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8 relative">
                      <label htmlFor="name" className="mb-3 block text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className={`border-stroke w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
                        }`}
                        required
                      />
                      {loading && !formData.name && (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8 relative">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`border-stroke w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
                        }`}
                        required
                      />
                      {loading && !formData.email && (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8 relative">
                      <label htmlFor="message" className="mb-3 block text-sm font-medium">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Enter your Message"
                        className={`border-stroke w-full resize-none rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
                        }`}
                        required
                      ></textarea>
                      
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className={`relative rounded-sm bg-sky-400 px-9 py-4 text-white font-medium shadow-submit duration-300 hover:bg-sky-500 ${
                        theme === 'dark' ? 'dark:shadow-submit-dark' : ''
                      }`}
                      disabled={loading} // Désactive le bouton pendant le chargement pour éviter les soumissions multiples
                    >
                      {loading ? (
                        <div className="absolute inset-0 flex justify-center items-center">
                          <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full"></div>
                        </div>
                      ) : (
                        'Submit'
                      )}
                    </button>

                  </div>

                  {status && <p className="mt-4 text-sm text-green-500">{status}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact2;
