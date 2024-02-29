import { useState } from "react";

import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";

function App({ reminderData }) {
  const [reminderLists, setReminderLists] = useState(reminderData);
  const [isAllRemindersDisplayed, setIsAllRemindersDisplayed] = useState(true);
  const [isWithFlagRemindersDisplayed, setIsWithFlagRemindersDisplayed] =
    useState(false);
  const [isCompletedRemindersDisplayed, setIsCompletedRemindersDisplayed] =
    useState(false);
  const [reminderListDisplayedId, setReminderListDisplayedId] = useState(null);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);

  return (
    <div className="flex h-lvh flex-row">
      <Sidebar
        isAddListModalOpen={isAddListModalOpen}
        reminderLists={reminderLists}
        setIsAddListModalOpen={setIsAddListModalOpen}
        setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
        setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
        setIsWithFlagRemindersDisplayed={setIsWithFlagRemindersDisplayed}
        setReminderListDisplayedId={setReminderListDisplayedId}
        setReminderLists={setReminderLists}
      />
      <Content
        isAllRemindersDisplayed={isAllRemindersDisplayed}
        isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
        isWithFlagRemindersDisplayed={isWithFlagRemindersDisplayed}
        reminderListDisplayedId={reminderListDisplayedId}
        reminderLists={reminderLists}
        setReminderLists={setReminderLists}
      />
    </div>
  );
}

export default App;
