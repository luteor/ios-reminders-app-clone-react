import { AddReminderButton } from "./AddReminderButton";
import { Reminder } from "./Reminder";
import { RemindersListHeader } from "./RemindersListHeader";

export const Content = () => {
  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        <RemindersListHeader />
      </div>
      <Reminder />
    </div>
  );
};
