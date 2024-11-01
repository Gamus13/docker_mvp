import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import axios from '../axios';

const Library = () => {

  const handleLogout = async () => {
    try {
      const resp = await axios.post('/logout');
      if (resp.status === 200) {
        localStorage.removeItem('user');
        window.location.href = '/app/';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
        {/* Wrapper pour englober tout le groupe avec l'icône de logout et l'icône de direction */}
        <div 
          onClick={handleLogout}
          className="flex items-center gap-2 " 
        >
          <FiUser className="text-neutral-400" size={20} title="User" />
          <p className="text-neutral-400 font-medium text-md">Logout</p>
        </div>
        {/* La div contenant l'icône de direction est maintenant séparée mais proche pour maintenir la mise en page */}
        <div className="flex items-center">
          <AiOutlineArrowRight
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            size={20}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {/* Ajoutez ici le reste de vos composants ou éléments de bibliothèque */}
      </div>
    </div>
  );
};

export default Library;
