import { Navigate, Outlet, useParams } from "react-router";
import { Navbar, Sidebar, BoardHeader } from "./components";
import { useTrelloStore } from "./store/flowBoardStore";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex min-h-screen pt-14">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

export const DefaultBoardRedirect = () => {
  const boards = useTrelloStore((state) => state.boards);
  const activeBoardId = useTrelloStore((state) => state.activeBoardId);

  const targetBoardId =
    boards.find((board) => board.id === activeBoardId)?.id ?? boards[0]?.id ?? null;

  if (!targetBoardId) {
    return <div className="p-6 text-slate-400">No boards available.</div>;
  }

  return <Navigate to={`/boards/${targetBoardId}`} replace />;
};

export const BoardPage = () => {
  const { boardId } = useParams();
  const board = useTrelloStore((state) => state.boards.find((b) => b.id === boardId));

  return (
    <section
      className="h-full overflow-y-auto"
      style={{ background: board?.backgroundColor ?? "transparent" }}
    >
      {board ? (
        <BoardHeader
          boardId={board.id}
          title={board.title}
          background={board.backgroundColor}
        />
      ) : (
        <h1 className="text-2xl font-bold text-white">Board not found</h1>
      )}
    </section>
  );
};
