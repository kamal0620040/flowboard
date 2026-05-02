import { useFlowBoardStore } from "../store/flowBoardStore";
import { getDarkenedBoardBackground } from "../utils/boardBackground";
import EditableBoardTitle from "./EditableBoardTitle";

interface BoardHeaderProps {
  boardId: string;
  title: string;
  background: string;
}

const BoardHeader = ({ boardId, title, background }: BoardHeaderProps) => {
  const seedBoard = useFlowBoardStore((s) => s.seedBoard);

  return (
    <section
      className="px-3 py-4 border-b border-white/10"
      style={{ background: getDarkenedBoardBackground(background) }}
    >
      <div className="flex items-center justify-between">
        <EditableBoardTitle
          boardId={boardId}
          initialTitle={title}
        />

        <div className="ml-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (!boardId) return;
              // confirm to avoid accidental huge seed
              if (!window.confirm("Seed 1000 cards for this board?")) return;
              seedBoard(boardId, 1000);
            }}
            className="rounded bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Seed 1000
          </button>
        </div>
      </div>
    </section>
  );
};

export default BoardHeader;
