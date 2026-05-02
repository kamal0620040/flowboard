import { useFlowBoardStore } from "../store/flowBoardStore";
import { getDarkenedBoardBackground } from "../utils/boardBackground";
import EditableBoardTitle from "./EditableBoardTitle";
import Button from "./Button";

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
          <Button
            variant="secondary"
            handleClick={() => {
              if (!boardId) return;
              if (!window.confirm("Seed 1000 cards for this board?")) return;
              seedBoard(boardId, 1000);
            }}
          >
            Seed 1000
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BoardHeader;
