import React from "react";

const FeatureCard = ({ icon, title, description, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6  flex flex-col items-center text-center space-y-4">
    {icon}
    <h3 className="text-sky-400 font-bold text-lg">{title}</h3>
    <p className="text-gray-600">{description}</p>
    {children}
  </div>
);

// const FeaturesSection = () => {
//   return (
//     <div className="bg-gray-50 mt-4 py-12 px-4 md:px-8">
//       <h2 className="text-center text-3xl font-bold text-black">
//         What is Docxtalk used for?
//       </h2>
      
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Card 1 */}
//         <FeatureCard
//           icon={<span className="text-3xl">🌟</span>}
//           title="Découvrez les pépites du jour"
//           description="Profitez de la plus vaste librairie d'annonces et de produits. +200 millions chaque jour."
//         >
//             <div className="w-full">
//                 <img
//                 src="https://cdn.pixabay.com/photo/2020/12/15/14/35/girl-5833835_640.jpg"
//                 alt="Graph"
//                 className="rounded-md object-cover w-full h-54"
//                 />
//             </div>
//         </FeatureCard>

//         {/* Card 2 */}
//         <FeatureCard
//           icon={<span className="text-3xl">📈</span>}
//           title="Save time"
//           description="Suivez les tendances produits avant qu'ils n'explosent. Soyez premier à lancer des produits viraux."
//         >
//           <div className="w-full">
//             <img
//               src="https://cdn.pixabay.com/photo/2020/12/15/14/35/girl-5833835_640.jpg"
//               alt="Graph"
//               className="rounded-md object-cover w-full h-54"
//             />
//           </div>
//         </FeatureCard>

//         {/* Card 3 */}
//         <FeatureCard
//           icon={<span className="text-3xl">⚡</span>}
//           title="Prenez les bonnes décisions"
//           description="Confortez vos décisions avec des chiffres et analyses d'experts."
//         >
//             <div className="w-full">
//                 <img
//                 src="https://cdn.pixabay.com/photo/2020/12/15/14/35/girl-5833835_640.jpg"
//                 alt="Graph"
//                 className="rounded-md object-cover w-full h-54"
//                 />
//             </div>
//         </FeatureCard>
//       </div>
//     </div>
//   );
// };


const FeaturesSection = () => {
    return (
      <div className=" mt-4 py-12 px-4 md:px-8">
  
        <div className="container mx-auto mt-12 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <FeatureCard
              icon={<span className="text-3xl">🌟</span>}
              title="Découvrez les pépites du jour"
              description="Profitez de la plus vaste librairie d'annonces et de produits. +200 millions chaque jour."
            >
              <div className="w-full">
                <img
                  src="https://cdn.pixabay.com/photo/2020/12/15/14/35/girl-5833835_640.jpg"
                  alt="Graph"
                  className="rounded-md object-cover w-full h-54"
                />
              </div>
            </FeatureCard>
  
            {/* Card 2 */}
            <FeatureCard
              icon={<span className="text-3xl">📈</span>}
              title="Save time"
              description="Suivez les tendances produits avant qu'ils n'explosent. Soyez premier à lancer des produits viraux."
            >
              <div className="w-full">
                <img
                  src="https://cdn.pixabay.com/photo/2020/12/15/14/35/girl-5833835_640.jpg"
                  alt="Graph"
                  className="rounded-md object-cover w-full h-54"
                />
              </div>
            </FeatureCard>
  
            {/* Card 3 */}
            <FeatureCard
              icon={<span className="text-3xl">⚡</span>}
              title="Prenez les bonnes décisions"
              description="Confortez vos décisions avec des chiffres et analyses d'experts."
            >
              <div className="w-full">
                <img
                  src="https://cdn.pixabay.com/photo/2020/12/15/14/35/girl-5833835_640.jpg"
                  alt="Graph"
                  className="rounded-md object-cover w-full h-54"
                />
              </div>
            </FeatureCard>
          </div>
        </div>
      </div>
    );
  };
  
  
export default FeaturesSection;
