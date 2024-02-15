import { Reminder } from "@components/Reminder";

export const RemindersContainer = ({
  isAllRemindersDisplayed,
  reminderData,
  reminderList,
}) => {
  return (
    <>
      {isAllRemindersDisplayed
        ? reminderData.map((list) => (
            <div key={list.id} className="pb-6">
              <div className="pb-2 text-xl">{list.name}</div>
              {list.reminders.map((reminder) => (
                <Reminder key={reminder.id} reminder={reminder} />
              ))}
            </div>
          ))
        : reminderList.reminders.map((reminder) => (
            <Reminder key={reminder.id} reminder={reminder} />
          ))}
    </>
  );
};
