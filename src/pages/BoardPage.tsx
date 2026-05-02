import { useParams } from "react-router";
import { useFlowBoardStore } from "../store/flowBoardStore";
import { useShallow } from "zustand/react/shallow";
import { BoardHeader, Column, AddItemForm } from "../components";

export const BoardPage = () => {
  const { boardId } = useParams();
  const board = useFlowBoardStore((state) =>
    state.boards.find((board) => board.id === boardId),
  );
  const columnIds = useFlowBoardStore(
    useShallow((state) =>
      state.columns
        .filter((column) => column.boardId === boardId)
        .sort((a, b) => a.order - b.order)
        .map((column) => column.id)
    ),
  );

  return (
    <section
      className="flex-1 min-h-0 sidebar-scroll flex flex-col"
      style={{ background: board?.backgroundColor ?? "transparent" }}
    >
      {!board && (
        <h1 className="text-2xl h-full bg-[#1d1f24] flex justify-center items-center font-bold text-white">Board not found</h1>
      )}
      {board && (
        <div className="w-full flex-1 min-h-0 flex flex-col">
          <div className="w-full">
            <BoardHeader
              boardId={board.id}
              title={board.title}
              background={board.backgroundColor}
            />
          </div>

          <div className="overflow-x-auto sidebar-scroll flex-1 min-h-0">
            <div className="p-4 inline-flex items-start min-w-max h-full">
              {columnIds.map((colId) => (
                <Column key={colId} id={colId} />
              ))}

              <div className="mr-4 w-72 shrink-0 flex items-start">
                <AddItemForm
                  placeholder="Enter list name..."
                  submitText="Add list"
                  triggerButtonText="Add another list"
                  onSubmit={(title) => {
                    if (!boardId) return;
                    const addColumn = useFlowBoardStore.getState().addColumn;
                    addColumn(boardId, title);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
