import { useState } from "react";

import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";

function App({ reminderData }) {
  const [reminderListDisplayedId, setReminderListDisplayedId] = useState(1);
  const [isAllRemindersDisplayed, setIsAllRemindersDisplayed] = useState(true);

  const reminderListDisplayed = reminderData.find((list) => {
    return list.id === reminderListDisplayedId;
  });

  return (
    <div className="flex h-lvh flex-row">
      <Sidebar
        reminderLists={reminderData}
        setReminderListDisplayedId={setReminderListDisplayedId}
        setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
      />
      <Content
        reminderList={reminderListDisplayed}
        reminderData={reminderData}
        isAllRemindersDisplayed={isAllRemindersDisplayed}
      />
    </div>
  );
}

export default App;
