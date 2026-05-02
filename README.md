# FlowBoard

FlowBoard is a high-performance, keyboard-accessible task tracking. It is built to be fast, responsive, and completely manageable via keyboard, even with thousands of tasks loaded.

## Features

- **Multi-Board Management**: Create and manage multiple boards with unique titles and backgrounds.
- **Dynamic Kanban Columns**: Add, remove, and color-code columns to fit your workflow.
- **Task Management**: Seamlessly create, edit, delete, and complete cards.
- **Card Movement**: Move cards between columns through an accessible dropdown menu.
- **Real-time Search**: Find tasks instantly with a debounced search bar.
- **Virtualization**: Powered by `@tanstack/react-virtual` to handle 1,000+ tasks with zero lag.
- **Keyboard First**: Engineered for accessibility with focus traps, ARIA support, and dedicated keyboard sentinels.
- **Offline Persistence**: Automatic state saving to `localStorage`—your data stays even after a refresh.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flowboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to `http://localhost:5173` in your browser.

## 🛠️ Tech Stack

- **React 19**: Core frontend framework.
- **TypeScript**: Robust type-safe development.
- **Zustand**: State management with persistence.
- **Tailwind CSS 4**: Modern, utility-first styling.
- **React Router 7**: Client-side routing.
- **TanStack Virtual**: List virtualization for massive performance at scale.
