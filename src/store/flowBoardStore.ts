import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- Types & Interfaces ---

export interface SubTask {
  id: string;
  cardId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  order: number;
}

export interface Card {
  id: string;
  columnId: string;
  boardId: string;
  title: string;
  order: number;
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

interface TrelloStore {
  // State
  boards: Board[];
  columns: Column[];
  cards: Card[];
  subTasks: SubTask[];
  activeBoardId: string | null;
  searchQuery: string;

  // Global Actions
  setActiveBoard: (id: string) => void;
  deleteBoard: (id: string) => void;
  addBoard: (title: string) => string;
  updateBoardTitle: (id: string, title: string) => void;
  updateBoardColor: (id: string, color: string) => void;
  setSearchQuery: (query: string) => void;
}


const initialData = {
  activeBoardId: "board-1",
  searchQuery: "",
  boards: [
    { 
      id: "board-1", 
      title: "Product Roadmap", 
      backgroundColor: "#0747a6" 
    },
    { 
      id: "board-2", 
      title: "Personal Tasks", 
      backgroundColor: "#E3E1E3" 
    }
  ],
  columns: [
    { 
      id: "col-1", 
      boardId: "board-1", 
      title: "To Do", 
      order: 0, 
      backgroundColor: "#ebecf0", 
      isCollapsed: false 
    },
    { 
      id: "col-2", 
      boardId: "board-1", 
      title: "In Progress", 
      order: 1, 
      backgroundColor: "#ebecf0", 
      isCollapsed: false 
    },
    { 
      id: "col-3", 
      boardId: "board-1", 
      title: "Done", 
      order: 2, 
      backgroundColor: "#ebecf0", 
      isCollapsed: true // Testing image_82aa1f.png
    }
  ],
  cards: [
    { 
      id: "card-1", 
      columnId: "col-1", 
      boardId: "board-1", 
      title: "Setup Project Structure", 
      order: 0 
    },
    { 
      id: "card-2", 
      columnId: "col-1", 
      boardId: "board-1", 
      title: "Implement Zustand Store", 
      order: 1 
    },
    { 
      id: "card-3", 
      columnId: "col-2", 
      boardId: "board-1", 
      title: "Draft Design Doc", 
      order: 0 
    }
  ],
  subTasks: [
    { 
      id: "sub-1", 
      cardId: "card-1", 
      title: "Install Vite", 
      description: "Initialize the project using the React-TS template.",
      isCompleted: true, 
      order: 0 
    },
    { 
      id: "sub-2", 
      cardId: "card-1", 
      title: "Configure Tailwind", 
      description: "Set up tailwind.config.js and base CSS.",
      isCompleted: false, 
      order: 1 
    },
    { 
      id: "sub-3", 
      cardId: "card-2", 
      title: "Define Schema", 
      description: "Ensure the 4-tier normalization is correct.",
      isCompleted: false, 
      order: 0 
    }
  ]
};


export const useTrelloStore = create<TrelloStore>()(
  persist(
    (set) => ({
      // Initial State
    //   boards: [],
    //   columns: [],
    //   cards: [],
    //   subTasks: [],
    //   activeBoardId: null,
    //   searchQuery: '',

      ...initialData, 

      // Global Actions
      setActiveBoard: (id) => set({ activeBoardId: id }),
      updateBoardTitle: (id: string, title: string) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, title } : board
          ),
        }));
      },
      addBoard: (title: string) => {
        const id = `board-${Date.now()}`;
        const colors = ["#0747a6", "#519839", "#7c3aed", "#0ea5e9", "#db2777"];
        const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const newBoard = { id, title, backgroundColor };

        set((state) => ({
          boards: [...state.boards, newBoard],
          activeBoardId: id,
        }));

        return id;
      },
      deleteBoard: (id: string) => {
        set((state) => {
          const remainingBoards = state.boards.filter((b) => b.id !== id);
          const removedCardIds = state.cards.filter((c) => c.boardId === id).map((c) => c.id);
          const remainingColumns = state.columns.filter((c) => c.boardId !== id);
          const remainingCards = state.cards.filter((c) => c.boardId !== id);
          const remainingSubTasks = state.subTasks.filter((s) => !removedCardIds.includes(s.cardId));

          return {
            boards: remainingBoards,
            columns: remainingColumns,
            cards: remainingCards,
            subTasks: remainingSubTasks,
            activeBoardId: remainingBoards[0]?.id ?? null,
          };
        });
      },
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      updateBoardColor: (id: string, color: string) => {
        set((state) => ({
          boards: state.boards.map((b) => 
            b.id === id ? { ...b, backgroundColor: color } : b
          ),
        }));
      },
    }),
    {
      name: 'trello-state-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        boards: state.boards,
        columns: state.columns,
        cards: state.cards,
        subTasks: state.subTasks,
        activeBoardId: state.activeBoardId
      }),
    }
  )
);