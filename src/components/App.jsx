import { useState } from "react";

import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";

function App({ reminderData }) {
  const [reminderListDisplayedId, setReminderListDisplayedId] = useState(1);

  const reminderListDisplayed = reminderData.find((list) => {
    return list.id === reminderListDisplayedId;
  });

  return (
    <div className="flex h-lvh flex-row">
      <Sidebar
        reminderLists={reminderData}
        setReminderListDisplayedId={setReminderListDisplayedId}
      />
      <Content reminderList={reminderListDisplayed} />
    </div>
  );
}

export default App;
