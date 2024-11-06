import { HiHome, HiMail } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdHeadset, MdSubscriptions } from "react-icons/md"; // Ajoutez MdSubscriptions ici
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  return (
    <div className="flex flex-col h-full bg-gray-800 w-1/5 p-2 md:w-[250px]">
      {/* Ajout d'une image au-dessus des icônes */}
      <div className="flex justify-left mt-4 mb-4">
        <img 
          src="./images/logo/UntitledDocxtalk__1_-removebg-preview-removebg-preview (1).png"
          alt="Logo" 
          className="w-32 h-auto rounded-md"
        />
      </div>
      <div className="flex flex-col gap-y-4 px-5 py-4">
        <div
          className="flex items-center gap-2 text-neutral-400 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700"
          onClick={() => navigate('/home')}
        >
          <HiHome size={26} />
          <p className="font-medium text-md cursor-pointer">Home</p>
        </div>
        <div
          className="flex items-center gap-2 text-neutral-400 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700"
          onClick={() => navigate('/search')}
        >
          <BiSearch size={26} />
          <p className="font-medium text-md cursor-pointer">Search</p>
        </div>
        <div
          className="flex items-center gap-2 text-neutral-400 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700"
          onClick={() => navigate('/mails')}
        >
          <HiMail size={26} />
          <p className="font-medium text-md cursor-pointer">Suivi des mails</p>
        </div>
        <div
          className="flex items-center gap-2 text-neutral-400 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700"
          onClick={() => navigate('/customer-service')}
        >
          <MdHeadset size={26} />
          <p className="font-medium text-md cursor-pointer">Customer services</p>
        </div>
        <div
          className="flex items-center gap-2 text-neutral-400 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700"
          onClick={() => navigate('/subscriptions')} // Redirection vers /subscriptions
        >
          <MdSubscriptions size={26} /> {/* Icône d'abonnement */}
          <p className="font-medium text-md cursor-pointer">Subscriptions</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
