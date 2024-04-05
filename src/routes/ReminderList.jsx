import { useState } from "react";
import { useParams } from "react-router-dom";

import { AddReminderButton } from "@components/AddReminderButton";
import { AddReminderForm } from "@components/AddReminderForm";
import { ListHeader } from "@components/ListHeader";
import { ReminderContainer } from "@components/ReminderContainer";
import { useData } from "@hooks/useData";
import { filterReminders, sortRemindersByListId } from "@utils/reminderUtils";

export const ReminderList = () => {
  const [isAddReminderFormOpen, setIsAddReminderFormOpen] = useState(false);
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  const { reminderLists } = useData();

  const { listId } = useParams();

  const { completedListReminders, reminderList, uncompletedListReminders } =
    sortRemindersByListId(reminderLists, listId);

  const filteredListReminders = filterReminders(
    showCompletedReminders,
    uncompletedListReminders,
    completedListReminders,
  );

  return (
    <>
      <div className="flex flex-row justify-end">
        <AddReminderButton
          isAddReminderFormOpen={isAddReminderFormOpen}
          setIsAddReminderFormOpen={setIsAddReminderFormOpen}
        />
      </div>

      <ListHeader
        listColor={reminderList.color}
        listTitle={reminderList.name}
        setShowCompletedReminders={setShowCompletedReminders}
        showCompletedReminders={showCompletedReminders}
        totalCompletedReminders={completedListReminders.length}
        totalUncompletedReminders={uncompletedListReminders.length}
      />

      <ReminderContainer
        listColor={reminderList.color}
        reminders={filteredListReminders}
      />

      {isAddReminderFormOpen && (
        <AddReminderForm
          listColor={reminderList.color}
          listTitle={reminderList.name}
          setIsAddReminderFormOpen={setIsAddReminderFormOpen}
        />
      )}
    </>
  );
};
