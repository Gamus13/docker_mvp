// import React, { useState } from 'react';

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = [
//     {
//       id: 1,
//       title: 'Reliable Application Hosting',
//       subtitle: 'Quick and easy setup. Predictable and low costs.',
//       imageUrl: 'https://cdn.pixabay.com/photo/2020/04/23/12/44/lighthouse-5082316_640.jpg',
//     },
//     {
//       id: 2,
//       title: 'Once UI',
//       subtitle: 'Your 5-minute, no-code React design system',
//       imageUrl: 'https://cdn.pixabay.com/photo/2022/08/31/13/05/sea-7423274_640.jpg',
//     },
//     {
//       id: 3,
//       title: 'Building an adaptive design system for Archlight',
//       subtitle: 'Flexible and scalable using Next.js and Figma.',
//       imageUrl: 'https://cdn.pixabay.com/photo/2017/09/10/14/23/manipulation-2735720_640.jpg',
//     },
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full max-w-6xl mx-auto mt-10 overflow-hidden">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="min-w-full h-auto flex-shrink-0">
//             <img
//               src={slide.imageUrl}
//               alt={slide.title}
//               className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover"
//             />
//             <div className="absolute bottom-10 left-10 bg-opacity-50 bg-black p-4 rounded-lg text-white">
//               <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{slide.title}</h2>
//               <p className="text-sm md:text-lg">{slide.subtitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-center mt-4 space-x-4">
//         <button
//           onClick={prevSlide}
//           className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 transition"
//         >
//           Prev
//         </button>
//         <button
//           onClick={nextSlide}
//           className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

// import React, { useState } from 'react';
// import { cardStyle } from "../components/cardGradient";

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = [
//     {
//       id: 1,
//       title: 'Reliable Application Hosting',
//       subtitle: 'Quick and easy setup. Predictable and low costs.',
//       imageUrl: 'https://cdn.pixabay.com/photo/2020/04/23/12/44/lighthouse-5082316_640.jpg',
//     },
//     {
//       id: 2,
//       title: 'Once UI',
//       subtitle: 'Your 5-minute, no-code React design system',
//       imageUrl: 'https://cdn.pixabay.com/photo/2022/08/31/13/05/sea-7423274_640.jpg',
//     },
//     {
//       id: 3,
//       title: 'Building an adaptive design system for Archlight',
//       subtitle: 'Flexible and scalable using Next.js and Figma.',
//       imageUrl: 'https://cdn.pixabay.com/photo/2017/09/10/14/23/manipulation-2735720_640.jpg',
//     },
//   ];

//   // Gérer le clic sur les ronds indicateurs
//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="relative w-full max-w-6xl mx-auto mt-10 overflow-hidden">
//       {/* Conteneur des images */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="min-w-full h-auto flex-shrink-0">
//             <img
//               src={slide.imageUrl}
//               alt={slide.title}
//               style={cardStyle} 
//               className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover"
//             />
//             <div className="absolute bottom-10 left-10 bg-opacity-50 bg-black p-4 rounded-lg text-white">
//               <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{slide.title}</h2>
//               <p className="text-sm md:text-lg">{slide.subtitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Indicateurs (ronds) placés sous l'image */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? 'bg-blue-500' : 'bg-gray-400'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
import React, { useState } from 'react';
import { cardStyle } from "../components/cardGradient";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Reliable Application Hosting',
      subtitle: 'Quick and easy setup. Predictable and low costs.',
      imageUrl: 'https://cdn.pixabay.com/photo/2020/04/23/12/44/lighthouse-5082316_640.jpg',
    },
    {
      id: 2,
      title: 'Once UI',
      subtitle: 'Your 5-minute, no-code React design system',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/08/31/13/05/sea-7423274_640.jpg',
    },
    {
      id: 3,
      title: 'Building an adaptive design system for Archlight',
      subtitle: 'Flexible and scalable using Next.js and Figma.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/09/10/14/23/manipulation-2735720_640.jpg',
    },
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-10 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-auto flex-shrink-0 relative"> {/* Ajout de relative ici */}
            <div style={cardStyle} className="w-full h-full"> {/* Appliquer cardStyle avec w-full et h-full */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-[300px] md:h-[500px] lg:h-[700px] object-cover"
              />
            </div>
            <div className="absolute bottom-10 left-10 bg-opacity-50 bg-black p-4 rounded-lg text-white">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{slide.title}</h2>
              <p className="text-sm md:text-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-sky-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

