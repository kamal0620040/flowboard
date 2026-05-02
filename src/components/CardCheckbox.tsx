import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { useFlowBoardStore } from "../store/flowBoardStore";

export const CardCheckbox = ({ cardId, isCompleted }: { cardId: string, isCompleted: boolean }) => {
  const toggleCardComplete = useFlowBoardStore((state) => state.toggleCardComplete);

  return (
    <button
      type="button"
      onClick={() => toggleCardComplete(cardId)}
      className="mt-0.5 shrink-0 rounded-full focus:outline-none p-1 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
      aria-label={isCompleted ? "Mark card incomplete" : "Mark card complete"}
    >
      {isCompleted ? (
        <FiCheckCircle className="text-emerald-400" aria-hidden />
      ) : (
        <FiCircle className="text-slate-400" aria-hidden />
      )}
    </button>
  );
};
