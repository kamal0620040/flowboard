import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router";
import { useTrelloStore } from "../store/flowBoardStore";
import Button from "./Button";
import BoardListItem from "./BoardListItem";
import AddItemForm from "./AddItemForm";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [pendingFocusBoardId, setPendingFocusBoardId] = useState<string | null>(null);
  const { boardId } = useParams();
  const boards = useTrelloStore((state) => state.boards);
  const activeBoardId = useTrelloStore((state) => state.activeBoardId);
  const setActiveBoard = useTrelloStore((state) => state.setActiveBoard);
  const addBoard = useTrelloStore((state) => state.addBoard);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      boardId &&
      boards.some((board) => board.id === boardId) &&
      boardId !== activeBoardId
    ) {
      setActiveBoard(boardId);
    }
  }, [activeBoardId, boardId, boards, setActiveBoard]);

  return (
    <aside
      className={`sticky top-14 shrink-0 border-r border-white/10 bg-[#1d1f24] text-white overflow-visible transition-[width] duration-300 ${
        isCollapsed ? "w-8" : "w-64"
      }`}
    >
      <div
        className={`absolute inset-0 flex flex-col gap-5 p-4 transition-all duration-200 overflow-visible ${
          isCollapsed
            ? "opacity-0 pointer-events-none"
            : "opacity-100 delay-300"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="mt-2 text-lg font-semibold">Your Boards</h2>
        </div>

        {/* Add board UI */}
        <AddItemForm
          onSubmit={(title) => {
            const id = addBoard(title);
            setPendingFocusBoardId(id);
            navigate(`/boards/${id}`);
          }}
          placeholder="Add board title"
          submitText="Add board"
          triggerButtonText="New board"
          focusTriggerOnClose={false}
        />

        <div className="border-t border-white/10" />

        <nav className="flex-1 space-y-2 overflow-y-auto overflow-x-visible px-1 sidebar-scroll">
          {boards.map((board) => (
            <BoardListItem
              key={board.id}
              id={board.id}
              title={board.title}
              isCollapsed={isCollapsed}
              onBoardSelect={setActiveBoard}
              shouldFocus={pendingFocusBoardId === board.id}
              onFocusHandled={() => setPendingFocusBoardId(null)}
            />
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <Button
        handleClick={() => setIsCollapsed(!isCollapsed)}
        ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        classStyles={`absolute top-1/2 -translate-y-1/2 size-6 flex items-center justify-center bg-white text-black rounded-full shadow-md transition-all duration-300 ${
          isCollapsed ? "left-1/2 -translate-x-1/2" : "-right-3"
        }`}
      >
        {isCollapsed ? (
          <FiChevronRight size={20} />
        ) : (
          <FiChevronLeft size={20} />
        )}
      </Button>
    </aside>
  );
};

export default Sidebar;
