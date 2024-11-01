
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-gray-800 w-1/4 p-2 md:w-[300px]">
      {/* Ajout d'une image au-dessus des icônes */}
      <div className="flex justify-left mt-4 mb-4">
        <img 
          src="./images/logo/UntitledDocxtalk__1_-removebg-preview-removebg-preview (1).png"
          alt="Logo" 
          className="w-32 h-auto rounded-md" // Ajustez la taille selon vos besoins
        />
      </div>
      <div className="flex flex-col gap-y-4 px-5 py-4 ">
        <div className="flex items-center gap-2 text-neutral-400 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
          <HiHome size={26} />
          <p className="font-medium text-md cursor-pointer">Home</p>
        </div>
        <div className="flex items-center gap-2 text-neutral-400 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
          <BiSearch size={26} />
          <p className="font-medium text-md cursor-pointer">Search</p>
        </div>
        <div className="flex items-center gap-2 text-neutral-400 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
          <HiHome size={26} />
          <p className="font-medium text-md cursor-pointer">Users</p>
        </div>
        <div className="flex items-center gap-2 text-neutral-400 gap-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-sky-700">
          <BiSearch size={26} />
          <p className="font-medium text-md cursor-pointer">Messages</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
