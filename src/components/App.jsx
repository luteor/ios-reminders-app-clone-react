import { useState } from "react";

import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";

function App({ reminderData }) {
  const [reminderLists, setReminderLists] = useState(reminderData);
  const [isAllRemindersDisplayed, setIsAllRemindersDisplayed] = useState(true);
  const [isCompletedRemindersDisplayed, setIsCompletedRemindersDisplayed] =
    useState(false);
  const [reminderListDisplayedId, setReminderListDisplayedId] = useState(null);

  return (
    <div className="flex h-lvh flex-row">
      <Sidebar
        reminderLists={reminderLists}
        setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
        setReminderListDisplayedId={setReminderListDisplayedId}
        setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
      />
      <Content
        reminderLists={reminderLists}
        isAllRemindersDisplayed={isAllRemindersDisplayed}
        isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
        reminderListDisplayedId={reminderListDisplayedId}
        setReminderLists={setReminderLists}
      />
    </div>
  );
}

export default App;
