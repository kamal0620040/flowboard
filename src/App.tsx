import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
        <div className="pt-14 flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">Content</div>
        </div>
    </div>
  );
}

export default App;
