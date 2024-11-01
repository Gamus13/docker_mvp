
// import React, { useContext } from 'react';
// import NewsLatterBox from './NewsLatterBox';
// import { ThemeContext } from '../../contexts/ThemeContext';
// import SectionTitle from '../Common/SectionTitle';
// import DescriptionTitle from '../Common/descriptionTitle';

// const Contact = () => {
//   const { theme } = useContext(ThemeContext);

//   // Déterminez les classes en fonction du thème
//   const sectionClasses = `overflow-hidden py-16 md:py-20 lg:py-28 ${
//     theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
//   }`;

//   const containerClasses = `mb-12 rounded-sm px-8 py-11 shadow-lg sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] ${
//     theme === 'dark' ? 'bg-gray-800' : 'bg-white'
//   }`;

//   return (
//     <section id="contact" className={sectionClasses}>
      
//       <div className="container">
//         <DescriptionTitle
//           description="Contact"
//           center
//         />
//         {/* Responsive Title and Paragraph */}
//         <SectionTitle
//           title="Get in Touch with Us"
//           paragraph="We would love to hear from you. Fill out the form below and our support team will get back to you as soon as possible."
//           center
//           width="665px"
//         />
        
//         <div className="-mx-4 flex flex-wrap">
//           {/* Contact Form Section */}
//           <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
//             <div className={containerClasses} data-wow-delay=".15s">
//               <h2 className="mb-3 text-2xl font-bold sm:text-3xl lg:text-2xl xl:text-3xl">
//                 Need Help? Open a Ticket
//               </h2>
//               <p className="mb-12 text-base font-medium">
//                 Our support team will get back to you ASAP via email.
//               </p>
//               <form>
//                 <div className="-mx-4 flex flex-wrap">
//                   {/* Name Input */}
//                   <div className="w-full px-4 md:w-1/2">
//                     <div className="mb-8">
//                       <label
//                         htmlFor="name"
//                         className="mb-3 block text-sm font-medium"
//                       >
//                         Your Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         placeholder="Enter your name"
//                         className={`border-stroke w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
//                           theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
//                         }`}
//                       />
//                     </div>
//                   </div>
//                   {/* Email Input */}
//                   <div className="w-full px-4 md:w-1/2">
//                     <div className="mb-8">
//                       <label
//                         htmlFor="email"
//                         className="mb-3 block text-sm font-medium"
//                       >
//                         Your Email
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         placeholder="Enter your email"
//                         className={`border-stroke w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
//                           theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
//                         }`}
//                       />
//                     </div>
//                   </div>
//                   {/* Message Textarea */}
//                   <div className="w-full px-4">
//                     <div className="mb-8">
//                       <label
//                         htmlFor="message"
//                         className="mb-3 block text-sm font-medium"
//                       >
//                         Your Message
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         rows={5}
//                         placeholder="Enter your Message"
//                         className={`border-stroke w-full resize-none rounded-sm border px-6 py-3 text-base outline-none focus:border-primary ${
//                           theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#f8f8f8] text-body-color'
//                         }`}
//                       ></textarea>
//                     </div>
//                   </div>
//                   {/* Submit Button */}
//                   <div className="w-full px-4">
//                     <button className={`rounded-sm bg-sky-700 px-9 py-4 text-base font-medium shadow-submit duration-300 hover:bg-primary/90 ${
//                       theme === 'dark' ? 'dark:shadow-submit-dark' : ''
//                     }`}>
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           {/* Newsletter Box Section */}
//           <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
//             <NewsLatterBox />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
import React, { useContext, useState } from 'react';
import axios from '../../axios';  // Assure-toi d'avoir installé Axios
import NewsLatterBox from './NewsLatterBox';
import { ThemeContext } from '../../contexts/ThemeContext';
import SectionTitle from '../Common/SectionTitle';
import DescriptionTitle from '../Common/descriptionTitle';

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  // State pour capturer les valeurs du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State pour gérer les erreurs ou les messages de succès
  const [status, setStatus] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut

    try {
      // Envoi de la requête POST avec les données du formulaire
      const response = await axios.post('/send-email', formData);

      // Gère la réponse (ici, si succès)
      if (response.status === 200) {
        setStatus('Message envoyé avec succès !');
        // Réinitialiser le formulaire
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Quelque chose s'est mal passé. Veuillez réessayer.");
      }
    } catch (error) {
      setStatus("Erreur lors de l'envoi du message.");
    }
  };

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Classes dynamiques selon le thème
  const sectionClasses = `overflow-hidden py-16 md:py-20 lg:py-28 ${
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
  }`;

  const containerClasses = `mb-12 rounded-sm px-8 py-11 shadow-lg sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`;

  return (
    <section id="contact" className={sectionClasses}>
      <div className="container">
        <DescriptionTitle description="Contact" center />
        <SectionTitle
          title="Get in Touch with Us"
          paragraph="We would love to hear from you. Fill out the form below and our support team will get back to you as soon as possible."
          center
          width="665px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className={containerClasses} data-wow-delay=".15s">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium">
                Our support team will get back to you ASAP via email.
              </p>
              
              {/* Formulaire */}
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  {/* Name Input */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
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
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
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
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="w-full px-4">
                    <div className="mb-8">
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

                  {/* Submit Button */}
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className={`rounded-sm bg-sky-400 px-9 py-4 text-white font-medium shadow-submit duration-300 hover:bg-sky-500 ${
                        theme === 'dark' ? 'dark:shadow-submit-dark' : ''
                      }`}
                    >
                      Submit
                    </button>
                  </div>

                  {/* Message de statut */}
                  {status && <p className="mt-4 text-sm text-red-500">{status}</p>}
                </div>
              </form>
            </div>
          </div>

          {/* Newsletter Box Section */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
