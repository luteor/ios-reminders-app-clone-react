import { AddReminderButton } from "@components/AddReminderButton";
import { ReminderListHeader } from "@components/ReminderListHeader";
import { RemindersContainer } from "@components/RemindersContainer";

export const Content = ({
  reminderLists,
  isAllRemindersDisplayed,
  reminderListDisplayedId,
}) => {
  const reminderListDisplayed = reminderLists.find(
    (list) => list.id === reminderListDisplayedId,
  );

  const totalAllReminders = reminderLists.reduce(
    (total, list) => total + list.reminders.length,
    0,
  );

  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        {isAllRemindersDisplayed ? (
          <ReminderListHeader
            listTitle={"All"}
            totalListReminders={totalAllReminders}
          />
        ) : (
          <ReminderListHeader
            listTitle={reminderListDisplayed.name}
            totalListReminders={reminderListDisplayed.reminders.length}
          />
        )}
      </div>
      <div>
        {isAllRemindersDisplayed ? (
          reminderLists.map((list) => (
            <RemindersContainer
              key={list.id}
              listTitle={list.name}
              listReminders={list.reminders}
            />
          ))
        ) : (
          <RemindersContainer
            listTitle={null}
            listReminders={reminderListDisplayed.reminders}
          />
        )}
      </div>
    </div>
  );
};
