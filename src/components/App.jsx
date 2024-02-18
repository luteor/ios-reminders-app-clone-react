import { useState } from "react";

import { AddListModal } from "@components/AddListModal";
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
      <AddListModal />
      <Sidebar
        reminderLists={reminderLists}
        setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
        setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
        setReminderListDisplayedId={setReminderListDisplayedId}
      />
      <Content
        reminderLists={reminderLists}
        setReminderLists={setReminderLists}
        isAllRemindersDisplayed={isAllRemindersDisplayed}
        isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
        reminderListDisplayedId={reminderListDisplayedId}
      />
    </div>
  );
}

export default App;
