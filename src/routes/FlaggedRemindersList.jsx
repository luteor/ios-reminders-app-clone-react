import { useState } from "react";

import { ListHeader } from "@components/ListHeader";
import { ReminderContainer } from "@components/ReminderContainer";
import { useData } from "@hooks/useData";
import { filterReminders, sortFlaggedReminders } from "@utils/reminderUtils";

export const FlaggedRemindersList = () => {
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  const { reminderLists } = useData();

  const { completedFlaggedReminders, uncompletedFlaggedReminders } =
    sortFlaggedReminders(reminderLists);

  const filteredFlaggedReminders = filterReminders(
    showCompletedReminders,
    uncompletedFlaggedReminders,
    completedFlaggedReminders,
  );

  return (
    <>
      <ListHeader
        listColor={"orange"}
        listTitle={"With flag"}
        setShowCompletedReminders={setShowCompletedReminders}
        showCompletedReminders={showCompletedReminders}
        totalCompletedReminders={completedFlaggedReminders.length}
        totalUncompletedReminders={uncompletedFlaggedReminders.length}
      />

      <ReminderContainer
        listColor={"orange"}
        reminders={filteredFlaggedReminders}
      />
    </>
  );
};
