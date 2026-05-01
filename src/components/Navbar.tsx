import { FaTrello } from "react-icons/fa";

const Navbar = () => {
  return (
     <nav className="flex justify-between w-full fixed z-10 p-4 flex-row border-b text-white bg-[#1F1F21] border-[#E3E1E3]">
      <div className="flex flex-1 flex-row gap-2 font-extrabold justify-start">
        <FaTrello size={24} />
        Flow Board
      </div>
      <div>
        Menu
      </div>
    </nav>
  );
};

export default Navbar