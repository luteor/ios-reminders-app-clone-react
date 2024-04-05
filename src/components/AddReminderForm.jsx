import { useEffect, useRef, useState } from "react";

import { useData } from "@hooks/useData";
import { getDisplayColors } from "@utils/colorUtils";
import { IoIosFlag } from "react-icons/io";
import { IoFlagOutline } from "react-icons/io5";

export const AddReminderForm = ({
  listColor,
  listTitle,
  setIsAddReminderFormOpen,
}) => {
  const [reminderContent, setReminderContent] = useState("");
  const [newReminderTags, setNewReminderTags] = useState([]);
  const [newTagValue, setNewTagValue] = useState("");
  const [hasReminderDate, setHasReminderDate] = useState(false);

  const addReminderFormRef = useRef(null);
  const firstInputRef = useRef(null);
  const newReminderTagsRef = useRef(null);

  const { reminderLists, setReminderLists } = useData();

  useEffect(() => {
    newReminderTagsRef.current = newReminderTags;
  }, [newReminderTags]);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    const handleAddReminderFormClickOutside = (event) => {
      if (
        addReminderFormRef.current &&
        !addReminderFormRef.current.contains(event.target)
      ) {
        handleAddReminderFormSubmit(event);
      }
    };

    document.addEventListener("click", handleAddReminderFormClickOutside);

    return () => {
      document.removeEventListener("click", handleAddReminderFormClickOutside);
    };
  }, []);

  const handleNewTagValueKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const trimmedTag = event.target.value.trim();
      if (trimmedTag && !newReminderTags.includes(trimmedTag)) {
        setNewReminderTags([...newReminderTags, trimmedTag]);
      }
      setNewTagValue("");
    }
  };

  const handleReminderTagDeleteKeyDown = (event, tag) => {
    if (event.key === "Backspace") {
      const updatedTags = newReminderTags.filter((t) => t !== tag);
      setNewReminderTags(updatedTags);
    }
  };

  const handleAddReminderFormSubmit = (event) => {
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

    const newReminderTags = newReminderTagsRef.current;

    if (newReminderData.content) {
      const lastReminderId = reminderLists.reduce((maxReminderId, list) => {
        const lastReminderIdInList = list.reminders.reduce(
          (maxIdInList, reminder) => {
            return Math.max(maxIdInList, reminder.id);
          },
          0,
        );

        return Math.max(maxReminderId, lastReminderIdInList);
      }, 0);

      const newReminder = {
        content: newReminderData.content,
        date: newReminderData.date,
        early: "",
        flag: newReminderData.flag === "on" ? true : false,
        hour: newReminderData.hour,
        id: lastReminderId + 1,
        images: [],
        list: newReminderData.list,
        location: "",
        notes: newReminderData.notes,
        phone: "",
        priority: "",
        recurrence: "",
        state: newReminderData.state === "on" ? true : false,
        tags: newReminderTags,
        type: "standard",
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
      <div className="flex flex-row items-start justify-between border-b border-solid p-2">
        <div className="flex flex-row items-start gap-2">
          <label className="sr-only" htmlFor="reminder-state">
            State
          </label>
          <input
            className={`flex h-4 w-4 appearance-none items-center justify-center rounded-full bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`}
            id="reminder-state"
            name="state"
            type="checkbox"
          />

          <div className="flex flex-col items-start">
            <label className="sr-only" htmlFor="reminder-content">
              Content
            </label>
            <input
              className="w-full text-sm outline-none"
              id="reminder-content"
              name="content"
              onChange={(event) => setReminderContent(event.target.value)}
              ref={firstInputRef}
              type="text"
              value={reminderContent}
            />

            <label className="sr-only" htmlFor="reminder-notes">
              Notes
            </label>
            <input
              className="w-full text-sm text-gray-500 outline-none"
              id="reminder-notes"
              name="notes"
              onFocus={() =>
                !reminderContent ? setReminderContent("New element") : null
              }
              placeholder="Notes"
              type="text"
            />

            <label className="sr-only" htmlFor="reminder-tags">
              Tags
            </label>
            <div className="flex flex-row items-center gap-1 overflow-auto">
              {newReminderTags.length > 0 && (
                <div className="flex flex-grow flex-row gap-1 bg-transparent ">
                  {newReminderTags.map((tag, index) => (
                    <span
                      className="select-all bg-transparent text-sm text-sky-900"
                      key={index}
                      onKeyDown={(event) =>
                        handleReminderTagDeleteKeyDown(event, tag)
                      }
                      tabIndex={0}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <input
                className="w-full text-sm text-gray-500 outline-none placeholder-shown:font-normal"
                id="reminder-tags"
                name="tags"
                onChange={(event) => setNewTagValue(event.target.value)}
                onFocus={() =>
                  !reminderContent ? setReminderContent("New element") : null
                }
                onKeyDown={handleNewTagValueKeyDown}
                placeholder={newReminderTags.length > 0 ? "" : "Add tags"}
                type="text"
                value={newTagValue}
              />
            </div>

            <div className="flex flex-row items-center justify-start gap-2">
              <label className="sr-only" htmlFor="reminder-date">
                Date
              </label>
              <input
                className=" w-full rounded bg-gray-100 p-1 text-xs text-gray-500 outline-none"
                id="reminder-date"
                name="date"
                onChange={(event) => setHasReminderDate(!!event.target.value)}
                onFocus={() =>
                  !reminderContent ? setReminderContent("New element") : null
                }
                type="date"
              />
              {hasReminderDate && (
                <>
                  <label className="sr-only" htmlFor="reminder-date">
                    Hour
                  </label>
                  <input
                    className=" w-full rounded bg-gray-100 p-1 text-xs text-gray-500 outline-none"
                    id="reminder-hour"
                    name="hour"
                    type="time"
                  />
                </>
              )}

              {/* <label className="sr-only" htmlFor="reminder-location">
                Location
              </label>
              <input
                className="w-full rounded bg-gray-100 p-1 text-xs text-gray-500 outline-none "
                id="reminder-location"
                name="location"
                placeholder="Add location"
                type="text"
              /> */}

              <div className="relative flex items-center">
                <label className="sr-only" htmlFor="reminder-flag">
                  Flag
                </label>
                <input
                  className="peer h-5 w-5 appearance-none rounded-full p-1 "
                  id="reminder-flag"
                  name="flag"
                  onFocus={() =>
                    !reminderContent ? setReminderContent("New element") : null
                  }
                  type="checkbox"
                />
                <IoFlagOutline className=" pointer-events-none absolute left-1/2 h-6 w-6 -translate-x-1/2 rounded bg-gray-100  p-1.5 text-gray-500 opacity-100 peer-checked:opacity-0" />
                <IoIosFlag className=" pointer-events-none absolute  left-1/2 h-6 w-6 -translate-x-1/2 rounded bg-gray-100 p-1.5 text-orange-500 opacity-0 peer-checked:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
