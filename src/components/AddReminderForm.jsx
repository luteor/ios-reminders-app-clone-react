import { useEffect, useRef, useState } from "react";
import { IoIosFlag } from "react-icons/io";
import { IoFlagOutline } from "react-icons/io5";

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
  const [reminderContentValue, setReminderContentValue] = useState("");
  const addReminderFormRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

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
    <form ref={addReminderFormRef}>
      <div className="flex flex-row items-center justify-between border-b border-solid p-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <label htmlFor="reminder-state" className="sr-only">
            State
          </label>
          <input
            type="checkbox"
            name="state"
            id="reminder-state"
            className={`flex h-4 w-4 appearance-none items-center justify-center rounded-full bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`}
          />

          <div className="flex flex-col">
            <label htmlFor="reminder-content" className="sr-only">
              Content
            </label>
            <input
              ref={firstInputRef}
              value={reminderContentValue}
              type="text"
              id="reminder-content"
              name="content"
              className="w-full text-sm outline-none"
              onChange={(event) => setReminderContentValue(event.target.value)}
            />

            <label htmlFor="reminder-notes" className="sr-only">
              Notes
            </label>
            <input
              type="text"
              id="reminder-notes"
              name="notes"
              placeholder="Notes"
              className=" w-full  text-sm outline-none"
              onFocus={() =>
                !reminderContentValue
                  ? setReminderContentValue("New element")
                  : null
              }
            />

            <label htmlFor="reminder-tags" className="sr-only">
              Tags
            </label>
            <input
              type="text"
              id="reminder-tags"
              name="tags"
              placeholder="Add tags"
              className="w-full text-sm outline-none"
              onFocus={() =>
                !reminderContentValue
                  ? setReminderContentValue("New element")
                  : null
              }
            />

            <div className="flex flex-row items-center justify-start gap-2">
              <label htmlFor="reminder-date" className="sr-only">
                Date
              </label>
              <input
                type="date"
                id="reminder-date"
                name="date"
                className=" w-full rounded bg-gray-100 p-1 text-sm text-gray-500 outline-none"
              />

              <label htmlFor="reminder-location" className="sr-only">
                Location
              </label>
              <input
                type="text"
                id="reminder-location"
                name="location"
                className="w-full rounded bg-gray-100 p-1 text-sm text-gray-500 outline-none "
                placeholder="Add location"
              />

              <div className="relative flex items-center">
                <label htmlFor="reminder-flag" className="sr-only">
                  Flag
                </label>
                <input
                  type="checkbox"
                  name="flag"
                  id="reminder-flag"
                  className="peer h-6 w-6 appearance-none rounded-full  p-1 "
                />
                <IoFlagOutline className=" pointer-events-none absolute left-1/2 h-7 w-7 -translate-x-1/2 rounded bg-gray-200  p-1.5 text-gray-500 opacity-100 peer-checked:opacity-0" />
                <IoIosFlag className=" pointer-events-none absolute  left-1/2 h-7 w-7 -translate-x-1/2 rounded bg-gray-200 p-1.5 text-orange-500 opacity-0 peer-checked:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
