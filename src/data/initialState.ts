export const initialStateData = {
    boards: [
        {
            id: "board-1",
            title: "Product Development",
            backgroundColor: "linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%)",
        },
        {
            id: "board-2",
            title: "Marketing Campaign",
            backgroundColor: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
        },
        {
            id: "board-3",
            title: "Personal Tasks",
            backgroundColor: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
        },
    ],

    columns: [
        // Board 1
        { id: "col-1", boardId: "board-1", title: "Backlog", order: 0, isCollapsed: false },
        { id: "col-2", boardId: "board-1", title: "In Progress", order: 1, isCollapsed: false },
        { id: "col-3", boardId: "board-1", title: "Review", order: 2, isCollapsed: false },
        { id: "col-4", boardId: "board-1", title: "Done", order: 3, isCollapsed: false },

        // Board 2
        { id: "col-5", boardId: "board-2", title: "Ideas", order: 0, isCollapsed: false },
        { id: "col-6", boardId: "board-2", title: "Planning", order: 1, isCollapsed: false },
        { id: "col-7", boardId: "board-2", title: "Executing", order: 2, isCollapsed: false },
        { id: "col-8", boardId: "board-2", title: "Completed", order: 3, isCollapsed: false },

        // Board 3
        { id: "col-9", boardId: "board-3", title: "To Do", order: 0, isCollapsed: false },
        { id: "col-10", boardId: "board-3", title: "Doing", order: 1, isCollapsed: false },
        { id: "col-11", boardId: "board-3", title: "Done", order: 2, isCollapsed: false },
    ],

    cards: [
        // --- PRODUCT DEVELOPMENT (many cards) ---
        { id: "card-1", columnId: "col-1", boardId: "board-1", title: "Setup monorepo structure", order: 0, isCompleted: false, backgroundColor: "#1a583e" },
        { id: "card-2", columnId: "col-1", boardId: "board-1", title: "Design system tokens", order: 1, isCompleted: false, backgroundColor: "#664c01" },
        { id: "card-3", columnId: "col-1", boardId: "board-1", title: "Define API contracts", order: 2, isCompleted: false, backgroundColor: "#7e3d00" },
        { id: "card-4", columnId: "col-1", boardId: "board-1", title: "Research drag-drop libs", order: 3, isCompleted: false, backgroundColor: "#8b251d" },
        { id: "card-5", columnId: "col-1", boardId: "board-1", title: "Accessibility audit checklist", order: 4, isCompleted: false, backgroundColor: "#663284" },

        { id: "card-6", columnId: "col-2", boardId: "board-1", title: "Implement auth flow", order: 0, isCompleted: false, backgroundColor: "#114696" },
        { id: "card-7", columnId: "col-2", boardId: "board-1", title: "Build Kanban board UI", order: 1, isCompleted: false, backgroundColor: "#1a5569" },
        { id: "card-8", columnId: "col-2", boardId: "board-1", title: "State management with Zustand", order: 2, isCompleted: false, backgroundColor: "#3d5619" },
        { id: "card-9", columnId: "col-2", boardId: "board-1", title: "Implement card editing", order: 3, isCompleted: false, backgroundColor: "#76315c" },
        { id: "card-10", columnId: "col-2", boardId: "board-1", title: "Keyboard navigation support", order: 4, isCompleted: false, backgroundColor: "#4e5457" },

        { id: "card-11", columnId: "col-3", boardId: "board-1", title: "Review API performance", order: 0, isCompleted: false, backgroundColor: "#1a583e" },
        { id: "card-12", columnId: "col-3", boardId: "board-1", title: "UI polish & animations", order: 1, isCompleted: false, backgroundColor: "#664c01" },

        { id: "card-13", columnId: "col-4", boardId: "board-1", title: "Initial project setup", order: 0, isCompleted: true, backgroundColor: "#7e3d00" },
        { id: "card-14", columnId: "col-4", boardId: "board-1", title: "Routing structure complete", order: 1, isCompleted: true, backgroundColor: "#8b251d" },

        // --- MARKETING (medium size) ---
        { id: "card-15", columnId: "col-5", boardId: "board-2", title: "Brainstorm TikTok content", order: 0, isCompleted: false, backgroundColor: "#663284" },
        { id: "card-16", columnId: "col-5", boardId: "board-2", title: "Influencer outreach list", order: 1, isCompleted: false, backgroundColor: "#114696" },

        { id: "card-17", columnId: "col-6", boardId: "board-2", title: "Campaign timeline planning", order: 0, isCompleted: false, backgroundColor: "#1a5569" },
        { id: "card-18", columnId: "col-6", boardId: "board-2", title: "Budget allocation", order: 1, isCompleted: false, backgroundColor: "#3d5619" },

        { id: "card-19", columnId: "col-7", boardId: "board-2", title: "Launch Facebook ads", order: 0, isCompleted: false, backgroundColor: "#76315c" },
        { id: "card-20", columnId: "col-7", boardId: "board-2", title: "Email campaign rollout", order: 1, isCompleted: false, backgroundColor: "#4e5457" },

        { id: "card-21", columnId: "col-8", boardId: "board-2", title: "Analyze CTR metrics", order: 0, isCompleted: true, backgroundColor: "#1a583e" },

        // --- PERSONAL TASKS (dense realistic tasks) ---
        { id: "card-22", columnId: "col-9", boardId: "board-3", title: "Buy groceries", order: 0, isCompleted: false, backgroundColor: "#664c01" },
        { id: "card-23", columnId: "col-9", boardId: "board-3", title: "Finish assignment", order: 1, isCompleted: false, backgroundColor: "#7e3d00" },
        { id: "card-24", columnId: "col-9", boardId: "board-3", title: "Workout session", order: 2, isCompleted: false, backgroundColor: "#8b251d" },
        { id: "card-25", columnId: "col-9", boardId: "board-3", title: "Clean workspace", order: 3, isCompleted: false, backgroundColor: "#663284" },

        { id: "card-26", columnId: "col-10", boardId: "board-3", title: "Reading book", order: 0, isCompleted: false, backgroundColor: "#114696" },
        { id: "card-27", columnId: "col-10", boardId: "board-3", title: "Practice coding", order: 1, isCompleted: false, backgroundColor: "#1a5569" },

        { id: "card-28", columnId: "col-11", boardId: "board-3", title: "Morning routine", order: 0, isCompleted: true, backgroundColor: "#3d5619" },
        { id: "card-29", columnId: "col-11", boardId: "board-3", title: "Read 10 pages", order: 1, isCompleted: true, backgroundColor: "#76315c" },
    ],

    cardsById: {},

    activeBoardId: null,
    searchQuery: "",
};
