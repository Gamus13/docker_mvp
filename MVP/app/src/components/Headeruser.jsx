import React from "react"; // Seulement nécessaire pour les versions de React inférieures à 17
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeaderUser = () => {
  const navigate = useNavigate();

  return (
    <div className={`h-fit bg-gradient-to-b from-sky-800 p-6`}>
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <div
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition cursor-pointer"
            onClick={() => {
              // router.back();  // Décommenter si nécessaire
            }}
          >
            <RxCaretLeft className="text-white" size={35} />
          </div>
          <div
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition cursor-pointer"
            onClick={() => {
              // router.forward();  // Décommenter si nécessaire
            }}
          >
            <RxCaretRight className="text-white" size={35} />
          </div>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <div className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer">
            <HiHome className="text-black" size={20} />
          </div>
          <div className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer">
            <BiSearch className="text-black" size={20} />
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {/* Boutons d'exemple statiques */}
          
          <div
            className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-sky-700 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9 cursor-pointer"
            onClick={() => navigate("/app/generate")} // Redirige vers /app/test au clic
          >
            Generate Your Documents
          </div>
          
        </div>
      </div>
      {/* {children} */}
    </div>
  );
};

export default HeaderUser;
