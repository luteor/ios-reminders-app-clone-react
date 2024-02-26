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
  const [isAddReminderFormOpen, setIsAddReminderFormOpen] = useState(false);

  return (
    <div className="flex h-lvh flex-row">
      <Sidebar
        reminderLists={reminderLists}
        setReminderLists={setReminderLists}
        setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
        setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
        setIsWithFlagRemindersDisplayed={setIsWithFlagRemindersDisplayed}
        setReminderListDisplayedId={setReminderListDisplayedId}
        setIsAddListModalOpen={setIsAddListModalOpen}
        isAddListModalOpen={isAddListModalOpen}
      />
      <Content
        reminderLists={reminderLists}
        setReminderLists={setReminderLists}
        isAllRemindersDisplayed={isAllRemindersDisplayed}
        isWithFlagRemindersDisplayed={isWithFlagRemindersDisplayed}
        isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
        reminderListDisplayedId={reminderListDisplayedId}
        isAddReminderFormOpen={isAddReminderFormOpen}
        setIsAddReminderFormOpen={setIsAddReminderFormOpen}
      />
    </div>
  );
}

export default App;
