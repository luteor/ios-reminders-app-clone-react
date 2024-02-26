import { useEffect, useRef } from "react";

import { getDisplayColors } from "@utils/getDisplayColors";

export const AddReminderForm = ({
  reminderLists,
  setReminderLists,
  listReminders,
  listTitle,
  listColor,
  isAddReminderFormOpen,
  setIsAddReminderFormOpen,
}) => {
  const addReminderFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideAddReminderForm = (event) => {
      if (
        isAddReminderFormOpen &&
        addReminderFormRef.current &&
        !addReminderFormRef.current.contains(event.target)
      ) {
        handleSubmitAddReminderForm(event);
      }
    };

    document.addEventListener("click", handleClickOutsideAddReminderForm);

    return () => {
      document.removeEventListener("click", handleClickOutsideAddReminderForm);
    };
  }, [isAddReminderFormOpen]);

  const handleSubmitAddReminderForm = (event) => {
    event.preventDefault();
    const formData = new FormData(addReminderFormRef.current);

    const reminderState = formData.get("state");
    if (!reminderState) {
      formData.set("state", "false");
    }

    const reminderFlag = formData.get("flag");
    if (!reminderFlag) {
      formData.set("flag", "false");
    }

    formData.set("list", listTitle);
    const newReminderData = Object.fromEntries(formData);

    if (newReminderData.content) {
      const lastReminderId = listReminders.reduce(
        (max, reminder) => (reminder.id > max ? reminder.id : max),
        0,
      );

      const newReminder = {
        id: lastReminderId + 1,
        content: newReminderData.content,
        flag: newReminderData.flag === "on" ? true : false,
        notes: newReminderData.notes,
        tags: newReminderData.tags,
        date: newReminderData.date,
        priority: "",
        url: "",
        images: [],
        state: newReminderData.state === "on" ? true : false,
        list: newReminderData.list,
      };

      const listIndex = reminderLists.findIndex(
        (list) => list.name === listTitle,
      );

      if (listIndex !== -1) {
        const updatedReminderLists = [...reminderLists];
        updatedReminderLists[listIndex].reminders.push(newReminder);

        setReminderLists(updatedReminderLists);
      }
    }
    setIsAddReminderFormOpen(false);
  };

  const { checkedBgColor, checkedOutlineColor } = getDisplayColors(listColor);

  return (
    <form onSubmit={handleSubmitAddReminderForm} ref={addReminderFormRef}>
      <div className="flex flex-row items-center justify-between border-b border-solid p-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <input
            type="checkbox"
            name="state"
            id="reminder-state"
            className={`peer flex h-4 w-4 appearance-none items-center justify-center rounded-full bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`}
          />
          <div className="flex flex-col">
            <input
              type="text"
              id="reminder-content"
              name="content"
              className="h-5 w-full  p-1 "
            />
            <input
              type="text"
              id="reminder-notes"
              name="notes"
              placeholder="Notes"
              className="h-5 w-full  p-1 "
            />
            <input
              type="text"
              id="reminder-tags"
              name="tags"
              placeholder="Add tags"
              className="h-5 w-full  p-1 "
            />
            <div className="flex flex-row">
              <input
                type="date"
                id="reminder-date"
                name="date"
                className="h-5 w-full  p-1"
              />

              <input
                type="text"
                id="reminder-location"
                name="location"
                className="h-5 w-full  p-1 "
                placeholder="Add location"
              />

              <input
                type="checkbox"
                name="flag"
                id="reminder-flag"
                className="h-5 w-full  p-1 "
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
