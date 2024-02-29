import { useState } from "react";

import { AddReminderButton } from "@components/AddReminderButton";
import { AddReminderForm } from "@components/AddReminderForm";
import { ReminderListHeader } from "@components/ReminderListHeader";
import { RemindersContainer } from "@components/RemindersContainer";

export const Content = ({
  isAllRemindersDisplayed,
  isCompletedRemindersDisplayed,
  isWithFlagRemindersDisplayed,
  reminderListDisplayedId,
  reminderLists,

  setReminderLists,
}) => {
  const [isAddReminderFormOpen, setIsAddReminderFormOpen] = useState(false);

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
        {!isCompletedRemindersDisplayed &&
          !isAllRemindersDisplayed &&
          !isWithFlagRemindersDisplayed && (
            <AddReminderButton
              isAddReminderFormOpen={isAddReminderFormOpen}
              setIsAddReminderFormOpen={setIsAddReminderFormOpen}
            />
          )}

        {isAllRemindersDisplayed && (
          <ReminderListHeader
            listColor={"black"}
            listTitle={"All"}
            totalListReminders={totalAllReminders}
          />
        )}

        {isWithFlagRemindersDisplayed && (
          <ReminderListHeader
            listColor={"orange"}
            listTitle={"With flag"}
            totalListReminders={totalFlagsReminders}
          />
        )}

        {isCompletedRemindersDisplayed && (
          <ReminderListHeader
            listColor={"gray"}
            listTitle={"Completed"}
            totalListReminders={totalCompletedReminders}
          />
        )}

        {!isAllRemindersDisplayed &&
          !isWithFlagRemindersDisplayed &&
          !isCompletedRemindersDisplayed && (
            <ReminderListHeader
              listColor={reminderListDisplayed.color}
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
              isAllRemindersDisplayed={isAllRemindersDisplayed}
              isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
              isWithFlagRemindersDisplayed={isWithFlagRemindersDisplayed}
              key={list.id}
              listColor={list.color}
              listReminders={list.reminders.filter(
                (reminder) => reminder.state === false,
              )}
              listTitle={list.name}
              reminderLists={reminderLists}
              setReminderLists={setReminderLists}
            />
          ))}

        {isWithFlagRemindersDisplayed &&
          reminderLists.map((list) => (
            <RemindersContainer
              isAllRemindersDisplayed={isAllRemindersDisplayed}
              isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
              isWithFlagRemindersDisplayed={isWithFlagRemindersDisplayed}
              key={list.id}
              listColor={list.color}
              listReminders={list.reminders.filter(
                (reminder) =>
                  reminder.flag === true && reminder.state === false,
              )}
              listTitle={null}
              reminderLists={reminderLists}
              setReminderLists={setReminderLists}
            />
          ))}

        {isCompletedRemindersDisplayed &&
          reminderLists.map((list) => (
            <RemindersContainer
              isAllRemindersDisplayed={isAllRemindersDisplayed}
              isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
              isWithFlagRemindersDisplayed={isWithFlagRemindersDisplayed}
              key={list.id}
              listColor={list.color}
              listReminders={list.reminders.filter(
                (reminder) => reminder.state === true,
              )}
              listTitle={list.name}
              reminderLists={reminderLists}
              setReminderLists={setReminderLists}
            />
          ))}

        {!isAllRemindersDisplayed &&
          !isWithFlagRemindersDisplayed &&
          !isCompletedRemindersDisplayed && (
            <RemindersContainer
              isAllRemindersDisplayed={isAllRemindersDisplayed}
              isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
              isWithFlagRemindersDisplayed={isWithFlagRemindersDisplayed}
              listColor={reminderListDisplayed.color}
              listReminders={reminderListDisplayed.reminders.filter(
                (reminder) => reminder.state === false,
              )}
              listTitle={null}
              reminderLists={reminderLists}
              setReminderLists={setReminderLists}
            />
          )}

        {!isCompletedRemindersDisplayed &&
          !isAllRemindersDisplayed &&
          !isWithFlagRemindersDisplayed &&
          isAddReminderFormOpen && (
            <AddReminderForm
              isAddReminderFormOpen={isAddReminderFormOpen}
              listColor={reminderListDisplayed.color}
              listReminders={reminderListDisplayed.reminders}
              listTitle={reminderListDisplayed.name}
              reminderLists={reminderLists}
              setIsAddReminderFormOpen={setIsAddReminderFormOpen}
              setReminderLists={setReminderLists}
            />
          )}
      </div>
    </div>
  );
};
