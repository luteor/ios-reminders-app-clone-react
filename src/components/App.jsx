import { Content } from "./Content";
import { Sidebar } from "./Sidebar";

function App() {
  return (
    <div className="flex h-lvh flex-row">
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;
