import { useState } from "react";

import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";

function App({ reminderData }) {
  const [reminderLists, setReminderLists] = useState(reminderData);
  const [isAllRemindersDisplayed, setIsAllRemindersDisplayed] = useState(true);
  const [reminderListDisplayedId, setReminderListDisplayedId] = useState(null);

  return (
    <div className="flex h-lvh flex-row">
      <Sidebar
        reminderLists={reminderLists}
        setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
        setReminderListDisplayedId={setReminderListDisplayedId}
      />
      <Content
        reminderLists={reminderLists}
        isAllRemindersDisplayed={isAllRemindersDisplayed}
        reminderListDisplayedId={reminderListDisplayedId}
        setReminderLists={setReminderLists}
      />
    </div>
  );
}

export default App;
