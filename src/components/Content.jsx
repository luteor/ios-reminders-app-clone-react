import { reminderLists } from "../assets/reminders.json";
import { AddReminderButton } from "./AddReminderButton";
import { Reminder } from "./Reminder";
import { RemindersListHeader } from "./RemindersListHeader";

export const Content = () => {
  const remindersList = reminderLists[0];
  console.log(remindersList);

  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        <RemindersListHeader
          listTitle={remindersList.name}
          remindersTotal={remindersList.reminders.length.toString()}
        />
      </div>
      {remindersList.reminders.map((reminder) => (
        <Reminder key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
};
