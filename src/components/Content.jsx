import { AddReminderButton } from "@components/AddReminderButton";
import { ReminderListHeader } from "@components/ReminderListHeader";
import { RemindersContainer } from "@components/RemindersContainer";

export const Content = ({
  reminderLists,
  isAllRemindersDisplayed,
  reminderListDisplayedId,
  setReminderLists,
  isCompletedRemindersDisplayed,
}) => {
  const reminderListDisplayed = reminderLists.find(
    (list) => list.id === reminderListDisplayedId,
  );

  const totalAllReminders = reminderLists.reduce((total, list) => {
    return (
      total +
      list.reminders.filter((reminder) => reminder.state === false).length
    );
  }, 0);

  const totalCompletedReminders = reminderLists.reduce((total, list) => {
    return (
      total +
      list.reminders.filter((reminder) => reminder.state === true).length
    );
  }, 0);

  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        {isAllRemindersDisplayed && (
          <ReminderListHeader
            listTitle={"All"}
            totalListReminders={totalAllReminders}
          />
        )}

        {isCompletedRemindersDisplayed && (
          <ReminderListHeader
            listTitle={"Completed"}
            totalListReminders={totalCompletedReminders}
          />
        )}

        {!isAllRemindersDisplayed && !isCompletedRemindersDisplayed && (
          <ReminderListHeader
            listTitle={reminderListDisplayed.name}
            totalListReminders={
              reminderListDisplayed.reminders.filter(
                (reminder) => reminder.state === false,
              ).length
            }
          />
        )}
      </div>
      <div>
        {isAllRemindersDisplayed &&
          reminderLists.map((list) => (
            <RemindersContainer
              key={list.id}
              listTitle={list.name}
              listReminders={list.reminders.filter(
                (reminder) => reminder.state === false,
              )}
              setReminderLists={setReminderLists}
              reminderLists={reminderLists}
            />
          ))}

        {isCompletedRemindersDisplayed &&
          reminderLists.map((list) => (
            <RemindersContainer
              key={list.id}
              listTitle={list.name}
              listReminders={list.reminders.filter(
                (reminder) => reminder.state === true,
              )}
              setReminderLists={setReminderLists}
              reminderLists={reminderLists}
            />
          ))}

        {!isAllRemindersDisplayed && !isCompletedRemindersDisplayed && (
          <RemindersContainer
            listTitle={null}
            listReminders={reminderListDisplayed.reminders.filter(
              (reminder) => reminder.state === false,
            )}
            setReminderLists={setReminderLists}
            reminderLists={reminderLists}
          />
        )}
      </div>
    </div>
  );
};
