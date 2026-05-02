import { FiMoreHorizontal } from "react-icons/fi";
import Popover from "./Popover";
import Button from "./Button";
import { COLOR_PALETTE } from "../constants/styles";

interface ColumnHeaderProps {
  title: string;
  backgroundColor?: string;
  onUpdateColor: (color: string) => void;
}

const ColumnHeader = ({ title, backgroundColor, onUpdateColor }: ColumnHeaderProps) => {
  return (
    <div className="mb-3 flex items-start justify-between gap-2 px-1 pt-1">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>

      <Popover
        trigger={
          <Button
            variant="ghost"
            ariaLabel="Change column color"
            classStyles="!p-1 text-slate-300"
          >
            <FiMoreHorizontal aria-hidden />
          </Button>
        }
        width="w-64"
        position="right"
        ariaLabel="Column color picker"
        ariaDescription="Choose a static color for this column."
      >
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-100">
              Column color
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Pick a static color for this column.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {COLOR_PALETTE.solidColors.map((color) => (
              <Button
                key={color}
                handleClick={() => onUpdateColor(color)}
                classStyles={`w-full h-10 rounded-md border transition ${backgroundColor === color
                  ? "border-white"
                  : "border-white/10"
                  }`}
                style={{ backgroundColor: color }}
                aria-label={`Set column color to ${color}`}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default ColumnHeader;
