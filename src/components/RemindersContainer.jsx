import { Reminder } from "@components/Reminder";

export const RemindersContainer = ({
  listTitle,
  listReminders,
  setReminderLists,
  reminderLists,
}) => {
  return (
    <div className="pb-6">
      {listTitle && listReminders.length ? (
        <div className="pb-2 text-xl">{listTitle}</div>
      ) : null}

      {listReminders.map((reminder) => (
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
