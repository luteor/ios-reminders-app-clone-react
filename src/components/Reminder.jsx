import { useState } from "react";

import { UpdateReminderForm } from "@components/UpdateReminderForm";
import { getDisplayColors } from "@utils/getDisplayColors";
import { IoIosFlag } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";

export const Reminder = ({
  isCompletedRemindersDisplayed,
  listColor,
  reminder,
  reminderLists,
  setReminderLists,
}) => {
  const [isUpdateReminderFormOpen, setIsUpdateReminderFormOpen] =
    useState(false);

  const handleCheckReminder = () => {
    setTimeout(() => {
      const updatedReminderLists = reminderLists.map((list) => {
        return {
          ...list,
          reminders: list.reminders.map((reminderSearch) => {
            if (reminderSearch.id === reminder.id) {
              return {
                ...reminderSearch,
                state: !reminderSearch.state,
              };
            }
            return reminderSearch;
          }),
        };
      });
      setReminderLists(updatedReminderLists);
    }, 1000);
  };

  const { checkedBgColor, checkedOutlineColor } = getDisplayColors(listColor);

  return (
    <div className="relative">
      <div className="group  flex flex-row items-center justify-between border-b border-solid p-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <input
            className={`peer flex h-4 w-4 appearance-none items-center justify-center rounded-full  ${
              isCompletedRemindersDisplayed
                ? "border-none bg-gray-500 outline outline-1 outline-offset-1 outline-gray-500 checked:border checked:border-solid checked:border-gray-400 checked:bg-white checked:outline-none"
                : `bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`
            }`}
            id="reminder"
            name="reminder"
            onChange={handleCheckReminder}
            type="checkbox"
          />

          <label htmlFor="reminder">{reminder.content}</label>
        </div>
        <div className="flex flex-row items-center gap-3">
          <IoInformationCircleOutline
            className="relative h-6 w-auto text-blue-500 opacity-0 group-hover:opacity-100"
            onClick={(event) => {
              event.stopPropagation();
              setIsUpdateReminderFormOpen(true);
            }}
          />
          {reminder.flag ? (
            <IoIosFlag className="h-3.5 w-auto text-orange-500" />
          ) : null}
        </div>
      </div>
      {isUpdateReminderFormOpen && (
        <UpdateReminderForm
          isUpdateReminderFormOpen={isUpdateReminderFormOpen}
          reminder={reminder}
          reminderLists={reminderLists}
          setIsUpdateReminderFormOpen={setIsUpdateReminderFormOpen}
          setReminderLists={setReminderLists}
        />
      )}
    </div>
  );
};
