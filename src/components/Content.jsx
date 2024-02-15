import { AddReminderButton } from "@components/AddReminderButton";
import { Reminder } from "@components/Reminder";
import { ReminderListHeader } from "@components/ReminderListHeader";

export const Content = ({ reminderList }) => {
  console.log(reminderList);
  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        <ReminderListHeader
          listTitle={reminderList.name}
          totalReminders={reminderList.reminders.length.toString()}
        />
      </div>
      {reminderList.reminders.map((reminder) => (
        <Reminder key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
};
