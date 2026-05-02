import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { COLOR_PALETTE } from "../constants/styles";
import { generateId } from "../utils/id";
import { initialStateData } from "../data/initialState";

export interface Card {
  id: string;
  columnId: string;
  boardId: string;
  title: string;
  order: number;
  isCompleted: boolean;
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
  backgroundColor?: string;
  isCollapsed: boolean;
}

export interface Board {
  id: string;
  title: string;
  backgroundColor: string;
}

interface FlowBoardStore {
  boards: Board[];
  columns: Column[];
  cards: Card[];
  cardsById: Record<string, Card>;
  activeBoardId: string | null;
  searchQuery: string;
  pendingFocusCardId: string | null;

  setActiveBoard: (boardId: string) => void;
  deleteBoard: (boardId: string) => void;
  addBoard: (title: string) => string;
  addColumn: (boardId: string, title: string) => string;
  addCard: (columnId: string, title: string) => string;
  updateColumnColor: (columnId: string, color: string) => void;
  updateCardTitle: (cardId: string, title: string) => void;
  moveCardToColumn: (cardId: string, columnId: string) => void;
  toggleCardComplete: (cardId: string) => void;
  setPendingFocusCardId: (cardId: string | null) => void;
  deleteCard: (cardId: string) => void;
  seedBoard: (boardId: string, count: number) => void;
  updateBoardTitle: (boardId: string, title: string) => void;
  updateBoardColor: (boardId: string, color: string) => void;
  setSearchQuery: (query: string) => void;
}

const DEFAULT_COLUMN_COLOR = "#101204";

initialStateData.cardsById = Object.fromEntries(
  initialStateData.cards.map((c) => [c.id, c])
);

export const useFlowBoardStore = create<FlowBoardStore>()(
  persist(
    (set, get) => ({
      boards: initialStateData.boards,
      columns: initialStateData.columns,
      cards: initialStateData.cards,
      cardsById: initialStateData.cardsById,
      activeBoardId: initialStateData.activeBoardId,
      searchQuery: initialStateData.searchQuery,
      pendingFocusCardId: null,

      setActiveBoard: (boardId) => set({ activeBoardId: boardId }),

      updateBoardTitle: (boardId, title) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, title } : board
          ),
        }));
      },

      addBoard: (title) => {
        const boardId = generateId("board");
        const boardColors = COLOR_PALETTE.solidColors;
        const backgroundColor =
          boardColors[Math.floor(Math.random() * boardColors.length)];

        set((state) => ({
          boards: [...state.boards, { id: boardId, title, backgroundColor }],
          activeBoardId: boardId,
        }));

        return boardId;
      },

      addColumn: (boardId, title) => {
        const columnId = generateId("column");

        set((state) => ({
          columns: [
            ...state.columns,
            {
              id: columnId,
              boardId,
              title,
              order: Date.now(),
              backgroundColor: DEFAULT_COLUMN_COLOR,
              isCollapsed: false,
            },
          ],
        }));

        return columnId;
      },

      addCard: (columnId, title) => {
        const column = get().columns.find((columnItem) => columnItem.id === columnId);
        if (!column) return generateId("card");
        const cardId = generateId("card");

        const newCard: Card = {
          id: cardId,
          columnId,
          boardId: column.boardId,
          title,
          order: Date.now(),
          isCompleted: false,
        };

        set((state) => ({
          cards: [...state.cards, newCard],
          cardsById: { ...state.cardsById, [cardId]: newCard },
        }));

        return cardId;
      },

      updateColumnColor: (columnId, color) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId ? { ...column, backgroundColor: color } : column
          ),
        }));
      },

      updateCardTitle: (cardId, title) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, title } : card
          ),
          cardsById: state.cardsById[cardId]
            ? {
              ...state.cardsById,
              [cardId]: { ...state.cardsById[cardId], title },
            }
            : state.cardsById,
        }));
      },

      moveCardToColumn: (cardId, columnId) => {
        const targetColumn = get().columns.find((column) => column.id === columnId);
        if (!targetColumn) return;

        set((state) => {
          const nextCards = state.cards.map((card) => {
            if (card.id !== cardId) return card;

            return {
              ...card,
              columnId,
              boardId: targetColumn.boardId,
              order: Date.now(),
            };
          });

          const nextCardsById = state.cardsById[cardId]
            ? {
              ...state.cardsById,
              [cardId]: {
                ...state.cardsById[cardId],
                columnId,
                boardId: targetColumn.boardId,
                order: Date.now(),
              },
            }
            : state.cardsById;

          return {
            pendingFocusCardId: cardId,
            cards: nextCards,
            cardsById: nextCardsById,
          };
        });
      },

      toggleCardComplete: (cardId) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, isCompleted: !card.isCompleted } : card
          ),
          cardsById: state.cardsById[cardId]
            ? {
              ...state.cardsById,
              [cardId]: {
                ...state.cardsById[cardId],
                isCompleted: !state.cardsById[cardId].isCompleted,
              },
            }
            : state.cardsById,
        }));
      },

      setPendingFocusCardId: (cardId) => set({ pendingFocusCardId: cardId }),

      deleteCard: (cardId) => {
        set((state) => {
          const nextCards = state.cards.filter((card) => card.id !== cardId);
          const nextCardsById = { ...state.cardsById };

          delete nextCardsById[cardId];

          return {
            cards: nextCards,
            cardsById: nextCardsById,
          };
        });
      },

      seedBoard: (boardId, count) => {
        const boardColumns = get().columns.filter((column) => column.boardId === boardId);
        const boardColumnIds = boardColumns.map((column) => column.id);

        // If the board has no columns yet, create one so seed cards have a home.
        if (boardColumnIds.length === 0) {
          const fallbackColumnId = get().addColumn(boardId, "Backlog");
          boardColumnIds.push(fallbackColumnId);
        }

        const cardsToAdd: Card[] = [];
        const cardsByIdUpdates: Record<string, Card> = {};
        const timestampBase = Date.now();

        for (let index = 0; index < count; index++) {
          const cardId = generateId("seed");
          const columnId = boardColumnIds[index % boardColumnIds.length];

          const card: Card = {
            id: cardId,
            columnId,
            boardId,
            title: `Seeded card ${index + 1}`,
            order: timestampBase + index,
            isCompleted: false,
          };

          cardsToAdd.push(card);
          cardsByIdUpdates[cardId] = card;
        }

        set((state) => ({
          cards: [...state.cards, ...cardsToAdd],
          cardsById: { ...state.cardsById, ...cardsByIdUpdates },
        }));
      },

      deleteBoard: (boardId) => {
        set((state) => {
          const remainingBoards = state.boards.filter((board) => board.id !== boardId);
          const remainingColumns = state.columns.filter((column) => column.boardId !== boardId);
          const remainingCards = state.cards.filter((card) => card.boardId !== boardId);
          const remainingCardsById = Object.fromEntries(
            Object.entries(state.cardsById).filter(([, card]) => card.boardId !== boardId)
          ) as Record<string, Card>;

          return {
            boards: remainingBoards,
            columns: remainingColumns,
            cards: remainingCards,
            cardsById: remainingCardsById,
            activeBoardId: remainingBoards[0]?.id ?? null,
          };
        });
      },

      setSearchQuery: (query) => set({ searchQuery: query }),

      updateBoardColor: (boardId, color) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, backgroundColor: color } : board
          ),
        }));
      },
    }),
    {
      name: "flow-board-state-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        boards: state.boards,
        columns: state.columns,
        cards: state.cards,
        cardsById: state.cardsById,
        activeBoardId: state.activeBoardId,
      }),
    }
  )
);