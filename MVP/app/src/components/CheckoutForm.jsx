// import { useState } from "react";
// import { FcInfo } from "react-icons/fc";
// import { motion, AnimatePresence } from "framer-motion";
// import { fadeIn } from "../components/variants";
// import { stripeCheckout } from "../utils/apiService";
// import axios from "../axios";

// const Pricing = () => {
//     const [isYearly, setIsYearly] = useState(false);

//     const becomeAffiliate = async () => {
//         try {
//             const response = await axios.post('/api/become-affiliate'); // Exemple d'endpoint pour devenir un parrain
//             if (response.status === 200) {
//                 console.log('You are now an affiliate!'); // Facultatif : gérer la confirmation côté frontend
//                 // Activer la génération de liens d'affiliation ici si nécessaire
//             } else {
//                 console.error('Failed to become affiliate:', response.data);
//             }
//         } catch (error) {
//             console.error('Error becoming affiliate:', error);
//         }
//     };



//     const packages = [
//         { name: 'classic', monthlyPrice: 4.99, yearlyPrice: 58, description: "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
//         { name: 'Standard', monthlyPrice: 9.99, yearlyPrice: 399, description: "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
//         { name: 'Premium', monthlyPrice: 16.99, yearlyPrice: 189, description: "A common form of Lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
//     ];


//     const handlePayment = async (product, price) => {
//         try {
//             const { data } = await axios.post('/stripe/checkout', { product, price });
//             if (data.url) {
//                 window.location.href = `/stripe-checkout?url=${encodeURIComponent(data.url)}`;
//             } else {
//                 console.error('URL de paiement non reçue :', data);
//             }
//         } catch (error) {
//             console.error('Erreur :', error);
//         }
//     };
    


//     return (
//         <div className="py-10 md:px-14 p-4 max-w-screen-2xl mx-auto mt-20" id="pricing">
//             <div className="text-center">
//                 <h2 className="md:text-5xl text-2xl font-extrabold text-gray-900 mb-2">Here are all our plans</h2>
//                 <p className="text-tertiary md:w-1/3 mx-auto">A simple paragraph is comprised of three major components. The which is often a declarative sentence.</p>
//                 <div className="mt-16">
//                     {/* <div className="mt-16">
//                         <button
//                             onClick={becomeAffiliate}
//                             className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
//                         >
//                             Go to affiliate link
//                         </button>
//                     </div> */}
//                     <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
//                         <span className="mr-8 text-2xl font-semibold">Monthly</span>
//                         <div className="relative w-14 h-6 transition duration-200 ease-in-out bg-gray-300 rounded-full">
//                             <motion.div
//                                 className="absolute w-6 h-6 bg-gray-500 rounded-full"
//                                 layout
//                                 transition={{ type: "spring", stiffness: 700, damping: 30 }}
//                                 style={{ left: isYearly ? '1.5rem' : '0' }}
//                             />
//                         </div>
//                         <span className="ml-8 text-2xl font-semibold">Yearly</span>
//                     </label>
//                     <input
//                         type="checkbox"
//                         id="toggle"
//                         className="hidden"
//                         checked={isYearly}
//                         onChange={() => setIsYearly(!isYearly)}
//                     />
//                 </div>
//             </div>
//             <motion.div
//                 variants={fadeIn("up", 0.3)}
//                 initial="hidden"
//                 whileInView={"show"}
//                 viewport={{ once: false, amount: 0.2 }}
//                 className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto"
//             >
//                 {packages.map((pkg, index) => (
//                     <motion.div 
//                         key={index} 
//                         className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <h3 className="text-3xl font-bold text-center text-[#010851]">{pkg.name}</h3>
//                         <p className="text-tertiary text-center my-6">{pkg.description}</p>
//                         <AnimatePresence mode="wait">
//                             <motion.p
//                                 key={isYearly ? `yearly-${pkg.name}` : `monthly-${pkg.name}`}
//                                 className="mt-5 text-center text-secondary text-4xl font-bold"
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 transition={{ duration: 0.2 }}
//                             >
//                                 {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}
//                                 <span className="text-base text-tertiary font-medium">/{isYearly ? 'year' : 'month'}</span>
//                             </motion.p>
//                         </AnimatePresence>
//                         <ul className="mt-4 space-y-2 px-4">
//                             <li className="flex items-center">
//                                 <FcInfo className="mr-2 text-xl" />
//                                 Videos of Lessons
//                             </li>
//                             <li className="flex items-center">
//                                 <FcInfo className="mr-2 text-xl" />
//                                 Homework check
//                             </li>
//                             <li className="flex items-center">
//                                 <FcInfo className="mr-2 text-xl" />
//                                 Additional practical task
//                             </li>
//                             <li className="flex items-center">
//                                 <FcInfo className="mr-2 text-xl" />
//                                 Monthly conferences
//                             </li>
//                             <li className="flex items-center">
//                                 <FcInfo className="mr-2 text-xl" />
//                                 Personal advice from teachers
//                             </li>
//                         </ul>

//                         {pkg.name !== 'classic' && (
//                             <div className="w-full mx-auto flex items-center justify-center mt-5">
//                                 <button
//                                     onClick={() => handlePayment(pkg.name, isYearly ? pkg.yearlyPrice : pkg.monthlyPrice)}
//                                     className="mt-6 px-10 text-white py-2 border border-secondary hover:bg-secondary hover:text-white bg-sky-500 font-semibold rounded-lg"
//                                 >
//                                     Get Started
//                                 </button>
//                             </div>
//                         )}
//                     </motion.div>
//                 ))}
//             </motion.div>
//         </div>
//     );
// };

// export default Pricing;

import { useState } from "react";
import axios from "../axios"; // Assurez-vous que cela pointe vers votre configuration Axios

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const packages = [
        { name: 'classic', monthlyPrice: 4.99, yearlyPrice: 58, description: "Lorem ipsum dolor sit amet." },
        { name: 'Standard', monthlyPrice: 9.99, yearlyPrice: 399, description: "Lorem ipsum dolor sit amet." },
        { name: 'Premium', monthlyPrice: 16.99, yearlyPrice: 189, description: "Lorem ipsum dolor sit amet." },
    ];

    const handlePayment = async (product, price) => {
        try {
            const { data } = await axios.post('/stripe/checkout', { product, price });
            if (data.url) {
                window.location.href = data.url; // Redirection vers la page de paiement Stripe
            } else {
                console.error('URL de paiement non reçue :', data);
            }
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    return (
        <div className="py-10 max-w-screen-2xl mx-auto mt-20" id="pricing">
            <div className="text-center">
                <h2 className="text-2xl font-extrabold mb-2">Here are all our plans</h2>
                <div className="mt-16">
                    <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
                        <span className="mr-8 text-2xl font-semibold">Monthly</span>
                        <div className="relative w-14 h-6 bg-gray-300 rounded-full">
                            <div
                                className={`absolute w-6 h-6 bg-gray-500 rounded-full transition-all duration-300 ${isYearly ? 'translate-x-8' : ''}`}
                            />
                        </div>
                        <span className="ml-8 text-2xl font-semibold">Yearly</span>
                    </label>
                    <input
                        type="checkbox"
                        id="toggle"
                        className="hidden"
                        checked={isYearly}
                        onChange={() => setIsYearly(!isYearly)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto">
                {packages.map((pkg, index) => (
                    <div key={index} className="border py-10 px-6 rounded-lg shadow-3xl">
                        <h3 className="text-3xl font-bold text-center">{pkg.name}</h3>
                        <p className="text-center my-6">{pkg.description}</p>
                        <p className="mt-5 text-center text-4xl font-bold">
                            {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}
                            <span className="text-base font-medium">/{isYearly ? 'year' : 'month'}</span>
                        </p>
                        <div className="w-full mx-auto flex items-center justify-center mt-5">
                            <button
                                onClick={() => handlePayment(pkg.name, isYearly ? pkg.yearlyPrice : pkg.monthlyPrice)}
                                className="mt-6 px-10 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
