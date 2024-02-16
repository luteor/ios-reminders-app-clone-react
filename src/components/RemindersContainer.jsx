import { Reminder } from "@components/Reminder";

export const RemindersContainer = ({
  listTitle,
  listReminders,
  setReminderLists,
  reminderLists,
}) => {
  const listRemindersTodo = listReminders.filter(
    (reminder) => reminder.state === false,
  );
  return (
    <div className="pb-6">
      {listTitle ? <div className="pb-2 text-xl">{listTitle}</div> : null}

      {listRemindersTodo.map((reminder) => (
        <Reminder
          key={reminder.id}
          reminder={reminder}
          setReminderLists={setReminderLists}
          reminderLists={reminderLists}
        />
      ))}
    </div>
  );
};
