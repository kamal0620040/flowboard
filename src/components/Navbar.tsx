import { FaTrello } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import { useFlowBoardStore } from "../store/flowBoardStore";
import Popover from "./Popover";
import Button from "./Button";
import { COLOR_PALETTE } from "../constants/styles";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const activeBoardId = useFlowBoardStore((state) => state.activeBoardId);
  const updateBoardColor = useFlowBoardStore((state) => state.updateBoardColor);

  const handleColorSelect = (color: string) => {
    if (activeBoardId) {
      updateBoardColor(activeBoardId, color);
    }
  };

  const triggerButton = (
    <Button
      variant="ghost"
      ariaLabel="Menu"
    >
      <RiMenuFill size={20} />
    </Button>
  );

  const colorPickerContent = (
    <>
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Gradients
        </p>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_PALETTE.gradients.map((gradient) => (
            <Button
              key={gradient}
              handleClick={() => handleColorSelect(gradient)}
              classStyles="w-full h-20 rounded cursor-pointer hover:opacity-80 transition border border-white/10"
              style={{ background: gradient }}
              aria-label="Gradient color"
            />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-t border-white/10 pt-3">
          Colors
        </p>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_PALETTE.solidColors.map((color) => (
            <Button
              key={color}
              handleClick={() => handleColorSelect(color)}
              classStyles="w-full h-10 rounded cursor-pointer hover:opacity-80 transition border border-white/10"
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <nav className="flex justify-between w-full fixed z-10 p-4 flex-row border-b text-white bg-[#1F1F21] border-[#E3E1E3]">
      <div className="flex items-center">
        <div className="flex items-center gap-2 font-extrabold justify-start">
          <FaTrello size={24} />
          Flow Board
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>
      <Popover trigger={triggerButton} width="w-72">
        {colorPickerContent}
      </Popover>
    </nav>
  );
};

export default Navbar;