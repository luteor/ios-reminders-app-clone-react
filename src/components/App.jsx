import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";

function App({ reminderData }) {
  return (
    <div className="flex h-lvh flex-row">
      <Sidebar reminderLists={reminderData} />
      <Content reminderList={reminderData[0]} />
    </div>
  );
}

export default App;
