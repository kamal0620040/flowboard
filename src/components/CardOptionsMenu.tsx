import { FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import Popover from "./Popover";
import Button from "./Button";
import { useFlowBoardStore } from "../store/flowBoardStore";
import { useShallow } from "zustand/react/shallow";

interface CardMoveMenuProps {
  cardId: string;
  boardId: string;
  currentColumnId: string;
}

const CardMoveMenu = ({ cardId, boardId, currentColumnId }: CardMoveMenuProps) => {
  const moveCardToColumn = useFlowBoardStore((state) => state.moveCardToColumn);
  const boardColumns = useFlowBoardStore(
    useShallow((state) =>
      state.columns
        .filter((column) => column.boardId === boardId && currentColumnId !== column.id)
        .sort((a, b) => a.order - b.order)
    )
  );

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-slate-100">Move to column</p>
        <p className="mt-1 text-xs text-slate-400">Choose a destination column for this card.</p>
      </div>

      <div className="space-y-2">
        {boardColumns.map((column) => (
          <Button
            key={column.id}
            handleClick={() => moveCardToColumn(cardId, column.id)}
            classStyles={`w-full px-3 py-2 text-left text-sm ${column.id === currentColumnId
              ? "bg-white/10 text-white"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
          >
            {column.title}
          </Button>
        ))}
        {boardColumns.length === 0 && (
          <p className="text-sm text-slate-400">No other columns to move this card to.</p>
        )}
      </div>
    </div>
  );
};

interface CardOptionsMenuProps {
  cardId: string;
  boardId: string;
  currentColumnId: string;
  onDeleteCard: () => void;
}

export const CardOptionsMenu = ({ cardId, boardId, currentColumnId, onDeleteCard }: CardOptionsMenuProps) => {
  return (
    <Popover
      trigger={
        <Button
          variant="ghost"
          ariaLabel="Move card to another column"
          classStyles="!p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
        >
          <FiMoreHorizontal aria-hidden />
        </Button>
      }
      width="w-80"
      position="right"
    >
      <div className="space-y-3">
        <Button
          variant="danger"
          handleClick={onDeleteCard}
          classStyles="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 !focus:ring-red-400"
        >
          <FiTrash2 aria-hidden />
          Delete card
        </Button>

        <CardMoveMenu cardId={cardId} boardId={boardId} currentColumnId={currentColumnId} />
      </div>
    </Popover>
  );
};
