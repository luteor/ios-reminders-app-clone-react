import { useEffect, useRef, useState } from "react";

import { getDisplayColors } from "@utils/getDisplayColors";
import { IoIosFlag } from "react-icons/io";
import { IoFlagOutline } from "react-icons/io5";

export const AddReminderForm = ({
  isAddReminderFormOpen,
  listColor,
  listReminders,
  listTitle,
  reminderLists,
  setIsAddReminderFormOpen,
  setReminderLists,
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
        content: newReminderData.content,
        date: newReminderData.date,
        flag: newReminderData.flag === "on" ? true : false,
        id: lastReminderId + 1,
        images: [],
        list: newReminderData.list,
        notes: newReminderData.notes,
        priority: "",
        state: newReminderData.state === "on" ? true : false,
        tags: newReminderData.tags,
        url: "",
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
          <label className="sr-only" htmlFor="reminder-state">
            State
          </label>
          <input
            className={`flex h-4 w-4 appearance-none items-center justify-center rounded-full bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`}
            id="reminder-state"
            name="state"
            type="checkbox"
          />

          <div className="flex flex-col">
            <label className="sr-only" htmlFor="reminder-content">
              Content
            </label>
            <input
              className="w-full text-sm outline-none"
              id="reminder-content"
              name="content"
              onChange={(event) => setReminderContentValue(event.target.value)}
              ref={firstInputRef}
              type="text"
              value={reminderContentValue}
            />

            <label className="sr-only" htmlFor="reminder-notes">
              Notes
            </label>
            <input
              className=" w-full  text-sm outline-none"
              id="reminder-notes"
              name="notes"
              onFocus={() =>
                !reminderContentValue
                  ? setReminderContentValue("New element")
                  : null
              }
              placeholder="Notes"
              type="text"
            />

            <label className="sr-only" htmlFor="reminder-tags">
              Tags
            </label>
            <input
              className="w-full text-sm outline-none"
              id="reminder-tags"
              name="tags"
              onFocus={() =>
                !reminderContentValue
                  ? setReminderContentValue("New element")
                  : null
              }
              placeholder="Add tags"
              type="text"
            />

            <div className="flex flex-row items-center justify-start gap-2">
              <label className="sr-only" htmlFor="reminder-date">
                Date
              </label>
              <input
                className=" w-full rounded bg-gray-100 p-1 text-sm text-gray-500 outline-none"
                id="reminder-date"
                name="date"
                type="date"
              />

              <label className="sr-only" htmlFor="reminder-location">
                Location
              </label>
              <input
                className="w-full rounded bg-gray-100 p-1 text-sm text-gray-500 outline-none "
                id="reminder-location"
                name="location"
                placeholder="Add location"
                type="text"
              />

              <div className="relative flex items-center">
                <label className="sr-only" htmlFor="reminder-flag">
                  Flag
                </label>
                <input
                  className="peer h-6 w-6 appearance-none rounded-full  p-1 "
                  id="reminder-flag"
                  name="flag"
                  type="checkbox"
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
