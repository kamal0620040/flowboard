import { Outlet } from "react-router";
import { Navbar, Sidebar } from "./components";

export { DefaultBoardRedirect, BoardPage } from "./pages";

function App() {
  return (
    <div className="fixed inset-0 flex flex-col overflow-clip bg-[#121212]">
      <Navbar />
      <div className="flex h-full w-full pt-14">
        <Sidebar />
        <main className="min-w-0 flex-1 flex flex-col min-h-0 overflow-clip">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
