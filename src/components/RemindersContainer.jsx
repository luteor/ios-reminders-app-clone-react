import { Reminder } from "@components/Reminder";

export const RemindersContainer = ({ listTitle, listReminders }) => {
  return (
    <div className="pb-6">
      {listTitle ? <div className="pb-2 text-xl">{listTitle}</div> : null}

      {listReminders.map((reminder) => (
        <Reminder key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
};
