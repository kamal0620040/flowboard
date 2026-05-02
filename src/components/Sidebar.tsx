import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router";
import { useFlowBoardStore } from "../store/flowBoardStore";
import Button from "./Button";
import BoardListItem from "./BoardListItem";
import AddItemForm from "./AddItemForm";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [pendingFocusBoardId, setPendingFocusBoardId] = useState<string | null>(null);

  const { boardId } = useParams();

  const boards = useFlowBoardStore((state) => state.boards);
  const activeBoardId = useFlowBoardStore((state) => state.activeBoardId);
  const setActiveBoard = useFlowBoardStore((state) => state.setActiveBoard);
  const addBoard = useFlowBoardStore((state) => state.addBoard);

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

  const handleToggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <aside
      className={`sticky top-14 shrink-0 border-r border-white/10 bg-[#1d1f24] text-white overflow-visible ${isCollapsed ? "w-8" : "w-64"
        }`}
    >
      {!isCollapsed && (
        <div
          className="absolute left-0 top-0 flex h-full w-64 flex-col gap-5 p-4 overflow-visible"
        >

          <div className="mb-3" />

          {/* Add board UI */}
          <AddItemForm
            onSubmit={(title) => {
              const id = addBoard(title);
              setPendingFocusBoardId(id);
              navigate(`/boards/${id}`);
            }}
            placeholder="Add board title"
            submitText="Add board"
            triggerButtonText="Add New board"
            focusTriggerOnClose={false}
          />

          <div className="border-t border-white/10" />

          <h2 className="mt-2 text-lg font-semibold">Your Boards</h2>

          <nav className="pt-2 flex-1 space-y-1 overflow-y-auto overflow-x-visible px-1 sidebar-scroll">
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
            {boards.length === 0 && (
              <p className="-mt-2 text-sm text-slate-400">No boards yet. Create one!</p>
            )}
          </nav>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        handleClick={handleToggleSidebar}
        ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        classStyles={`absolute top-1/2 -translate-y-1/2 size-6 flex items-center justify-center bg-white text-black rounded-full shadow-md ${isCollapsed ? "left-1/2 -translate-x-1/2" : "-right-3"
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
