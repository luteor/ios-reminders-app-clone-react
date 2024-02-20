import { AddReminderButton } from "@components/AddReminderButton";
import { ReminderListHeader } from "@components/ReminderListHeader";
import { RemindersContainer } from "@components/RemindersContainer";

export const Content = ({
  reminderLists,
  setReminderLists,
  reminderListDisplayedId,
  isAllRemindersDisplayed,
  isWithFlagRemindersDisplayed,
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

  const totalFlagsReminders = reminderLists.reduce((total, list) => {
    return (
      total + list.reminders.filter((reminder) => reminder.flag === true).length
    );
  }, 0);

  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        {isAllRemindersDisplayed && (
          <ReminderListHeader
            listTitle={"All"}
            listColor={"black"}
            totalListReminders={totalAllReminders}
          />
        )}

        {isWithFlagRemindersDisplayed && (
          <ReminderListHeader
            listTitle={"With flag"}
            listColor={"orange"}
            totalListReminders={totalFlagsReminders}
          />
        )}

        {isCompletedRemindersDisplayed && (
          <ReminderListHeader
            listTitle={"Completed"}
            listColor={"gray"}
            totalListReminders={totalCompletedReminders}
          />
        )}

        {!isAllRemindersDisplayed &&
          !isWithFlagRemindersDisplayed &&
          !isCompletedRemindersDisplayed && (
            <ReminderListHeader
              listTitle={reminderListDisplayed.name}
              listColor={reminderListDisplayed.color}
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
              listColor={list.color}
              listReminders={list.reminders.filter(
                (reminder) => reminder.state === false,
              )}
              setReminderLists={setReminderLists}
              reminderLists={reminderLists}
            />
          ))}

        {isWithFlagRemindersDisplayed &&
          reminderLists.map((list) => (
            <RemindersContainer
              key={list.id}
              listTitle={null}
              listColor={list.color}
              listReminders={list.reminders.filter(
                (reminder) =>
                  reminder.flag === true && reminder.state === false,
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
              listColor={list.color}
              listReminders={list.reminders.filter(
                (reminder) => reminder.state === true,
              )}
              setReminderLists={setReminderLists}
              reminderLists={reminderLists}
            />
          ))}

        {!isAllRemindersDisplayed &&
          !isWithFlagRemindersDisplayed &&
          !isCompletedRemindersDisplayed && (
            <RemindersContainer
              listTitle={null}
              listColor={reminderListDisplayed.color}
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
