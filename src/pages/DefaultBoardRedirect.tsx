import { Navigate } from "react-router";
import { useFlowBoardStore } from "../store/flowBoardStore";

export const DefaultBoardRedirect = () => {
  const boards = useFlowBoardStore((state) => state.boards);
  const activeBoardId = useFlowBoardStore((state) => state.activeBoardId);

  const targetBoardId =
    boards.find((board) => board.id === activeBoardId)?.id ??
    boards[0]?.id ??
    null;

  if (!targetBoardId) {
    return <div className="h-full bg-[#1d1f24] p-6 text-slate-200">No boards available.</div>;
  }

  return <Navigate to={`/boards/${targetBoardId}`} replace />;
};
