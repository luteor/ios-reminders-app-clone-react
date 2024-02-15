import { AddReminderButton } from "@components/AddReminderButton";
import { ReminderListHeader } from "@components/ReminderListHeader";
import { RemindersContainer } from "@components/RemindersContainer";

export const Content = ({
  reminderList,
  reminderData,
  isAllRemindersDisplayed,
}) => {
  console.log(reminderData);
  return (
    <div className="bg-grey-50 flex-grow overflow-auto p-2">
      <div className="pb-8 pl-2 pr-2">
        <AddReminderButton />
        <ReminderListHeader
          isAllRemindersDisplayed={isAllRemindersDisplayed}
          reminderList={reminderList}
          reminderData={reminderData}
        />
      </div>
      <RemindersContainer
        reminderList={reminderList}
        reminderData={reminderData}
        isAllRemindersDisplayed={isAllRemindersDisplayed}
      />
    </div>
  );
};
