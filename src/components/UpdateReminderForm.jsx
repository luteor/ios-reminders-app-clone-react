import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { convertToDateOnly } from "@utils/convertToDateOnly";
import { IoIosFlag, IoMdTrash } from "react-icons/io";
import { IoFlagOutline } from "react-icons/io5";

export const UpdateReminderForm = ({
  isUpdateReminderFormOpen,
  reminder,
  reminderLists,
  setIsUpdateReminderFormOpen,
  setReminderLists,
}) => {
  const [reminderFlagValue, setReminderFlagValue] = useState(reminder.flag);
  const [reminderTagValues, setReminderTagValues] = useState(reminder.tags);
  const [currentReminderTagValue, setCurrentReminderTagValue] = useState("");
  const [reminderImageValues, setReminderImageValues] = useState(
    reminder.images,
  );
  const [isReminderDate, setIsReminderDate] = useState(
    reminder.date ? true : false,
  );
  const [isReminderHour, setIsReminderHour] = useState(
    reminder.hour ? true : false,
  );

  const updateReminderFormRef = useRef(null);
  const reminderTagValuesRef = useRef(reminder.tags);
  const reminderImagesValuesRef = useRef(reminder.images);

  useEffect(() => {
    reminderTagValuesRef.current = reminderTagValues;
  }, [reminderTagValues]);

  useEffect(() => {
    reminderImagesValuesRef.current = reminderImageValues;
  }, [reminderImageValues]);

  useEffect(() => {
    const handleClickOutsideAddReminderForm = (event) => {
      if (
        isUpdateReminderFormOpen &&
        updateReminderFormRef.current &&
        !updateReminderFormRef.current.contains(event.target)
      ) {
        handleSubmitUpdateReminderForm(event);
      }
    };

    document.addEventListener("click", handleClickOutsideAddReminderForm);

    return () => {
      document.removeEventListener("click", handleClickOutsideAddReminderForm);
    };
  }, [isUpdateReminderFormOpen]);

  const handleCurrentTagValueChange = (event) => {
    setCurrentReminderTagValue(event.target.value);
  };

  const handleCurrentTagValueKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const trimmedTag = event.target.value.trim();
      if (trimmedTag && !reminderTagValues.includes(trimmedTag)) {
        setReminderTagValues([...reminderTagValues, trimmedTag]);
      }
      setCurrentReminderTagValue("");
    }
  };

  const handleKeyDown = (event, tag) => {
    if (event.key === "Backspace") {
      const updatedTags = reminderTagValues.filter((t) => t !== tag);
      setReminderTagValues(updatedTags);
    }
  };

  const handleImageTrashClick = (event, image) => {
    event.stopPropagation();
    const updatedImages = reminderImageValues.filter((i) => i !== image);
    console.log(updatedImages);
    setReminderImageValues(updatedImages);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files);
    const newFiles = files.filter(
      (file) =>
        !reminderImageValues.some(
          (existingFile) => existingFile.name === file.name,
        ),
    );
    setReminderImageValues([...reminderImageValues, ...newFiles]);
  };

  const handleSubmitUpdateReminderForm = (event) => {
    event.preventDefault();
    const formData = new FormData(updateReminderFormRef.current);

    const reminderFlag = formData.get("flag");
    if (!reminderFlag) {
      formData.set("flag", "false");
    }

    const urlValue = formData.get("url")?.toString();
    if (urlValue && !urlValue.startsWith("https://")) {
      formData.set("url", "");
    }

    console.log(reminderImageValues);

    const updateReminderData = Object.fromEntries(formData);
    console.log(updateReminderData);

    const updatedTags = reminderTagValuesRef.current;
    const updatedImages = reminderImagesValuesRef.current;

    const updatedReminderLists = reminderLists.map((reminderList) => ({
      ...reminderList,
      reminders: reminderList.reminders.map((r) =>
        r.id === reminder.id
          ? {
              ...r,
              content: updateReminderData.content,
              date: updateReminderData.date,
              early: updateReminderData.early,
              flag: updateReminderData.flag === "on" ? true : false,
              hour: updateReminderData.hour,
              images: updatedImages,
              notes: updateReminderData.notes,
              priority: updateReminderData.priority,
              recurrence: updateReminderData.recurrence,
              tags: updatedTags,
              url: updateReminderData.url,
            }
          : r,
      ),
    }));

    setReminderLists(updatedReminderLists);
    setIsUpdateReminderFormOpen(false);
  };

  return (
    <form
      className="absolute right-20 top-0 z-10 h-auto w-80 rounded-lg border border-solid border-gray-300 bg-stone-100 p-4 shadow-lg"
      ref={updateReminderFormRef}
    >
      <div className="absolute right-5 top-5">
        <div className="relative">
          <label className="sr-only" htmlFor="reminder-flag">
            Flag
          </label>
          <input
            checked={reminderFlagValue}
            className="peer h-6 w-6 appearance-none"
            id="reminder-flag"
            name="flag"
            onChange={() => setReminderFlagValue(!reminderFlagValue)}
            type="checkbox"
          />
          <IoFlagOutline className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-9 -translate-x-1/2 -translate-y-1/2 rounded border bg-white p-1.5 text-gray-500 opacity-100 peer-checked:opacity-0" />
          <IoIosFlag className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-9 -translate-x-1/2 -translate-y-1/2 rounded border bg-white p-1.5 text-orange-500 opacity-0 peer-checked:opacity-100" />
        </div>
      </div>

      <label className="sr-only" htmlFor="reminder-content">
        Content
      </label>
      <input
        className="w-full bg-transparent text-lg font-medium outline-none"
        defaultValue={reminder.content}
        id="reminder-content"
        name="content"
        type="text"
      />

      <label className="sr-only" htmlFor="reminder-notes">
        Notes
      </label>
      <input
        className=" w-full border-b bg-transparent pb-1 text-sm outline-none"
        defaultValue={reminder.notes}
        id="reminder-notes"
        name="notes"
        placeholder="Notes"
        type="text"
      />

      <label className="sr-only" htmlFor="reminder-tags">
        Tags
      </label>
      <div className="flex flex-row gap-1 overflow-auto border-b p-1">
        {reminderTagValues.length > 0 && (
          <div className="flex flex-grow flex-row gap-1 bg-transparent">
            {reminderTagValues.map((tag, index) => (
              <span
                className="select-all bg-transparent text-xs"
                key={index}
                onKeyDown={(event) => handleKeyDown(event, tag)}
                tabIndex={0}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <input
          className="w-full bg-transparent text-xs outline-none"
          id="reminder-tags"
          name="tags"
          onChange={handleCurrentTagValueChange}
          onKeyDown={handleCurrentTagValueKeyDown}
          placeholder={reminderTagValues.length > 0 ? "" : "Add tags"}
          type="text"
          value={currentReminderTagValue}
        />
      </div>

      <fieldset className="flex w-full flex-col gap-2 border-b p-2 text-xs">
        <div className="flex flex-row items-start gap-4">
          <legend className="w-4/12 text-right">Warn me</legend>
          <div className="w-8/12">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1">
                <input
                  checked={isReminderDate}
                  id="reminder-date-checkbox"
                  name="date-checkbox"
                  onChange={() => setIsReminderDate(!isReminderDate)}
                  type="checkbox"
                />
                <label htmlFor="reminder-date-checkbox">On a day</label>
              </div>
              {isReminderDate && (
                <div>
                  <input
                    className="bg-transparent"
                    defaultValue={convertToDateOnly(reminder.date)}
                    id="reminder-date"
                    name="date"
                    type="date"
                  />
                  <label className="sr-only" htmlFor="reminder-date">
                    Date
                  </label>
                </div>
              )}

              <div className="flex flex-row gap-1">
                <input
                  checked={isReminderHour}
                  id="reminder-hour-checkbox"
                  name="hour-checkbox"
                  onChange={() => setIsReminderHour(!isReminderHour)}
                  type="checkbox"
                />
                <label htmlFor="reminder-hour-checkbox">At a time</label>
              </div>
              {isReminderHour && (
                <div>
                  <input
                    className="appearance-none bg-transparent"
                    defaultValue={reminder.hour}
                    id="reminder-hour"
                    name="hour"
                    type="time"
                  />
                  <label className="sr-only" htmlFor="reminder-hour">
                    Date
                  </label>
                </div>
              )}

              <div className="flex flex-row gap-1">
                <input id="reminder-location" name="location" type="checkbox" />
                <label htmlFor="reminder-location">At a location</label>
              </div>
              <div className="flex flex-row gap-1">
                <input id="reminder-phone" name="phone" type="checkbox" />
                <label htmlFor="reminder-phone">When a message is sent</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flew-row flex items-center gap-4">
          <label className="w-4/12 text-right" htmlFor="early-reminder">
            Early reminder
          </label>
          <div className="w-8/12">
            <select
              className="appearance-none bg-transparent"
              defaultValue={reminder.early}
              id="early-reminder"
              name="early"
            >
              <option value="">None</option>
              <option value="5 minutes before">5 minutes before</option>
              <option value="15 minutes before">15 minutes before</option>
              <option value="30 minutes before">30 minutes before</option>
              <option value="1 hour before">1 hour before</option>
              <option value="2 hours before">2 hours before</option>
              <option value="1 day before">1 day before</option>
              <option value="2 days before">2 days before</option>
              <option value="1 week before">1 week before</option>
              <option value="1 month before">1 month before</option>
            </select>
          </div>
        </div>

        <div className="flew-row flex items-center gap-4">
          <label className="w-4/12 text-right" htmlFor="reminder-recurrence">
            Recurrence
          </label>
          <div className="w-8/12">
            <select
              className="appearance-none bg-transparent"
              defaultValue={reminder.recurrence}
              id="reminder-recurrence"
              name="recurrence"
            >
              <option value="">Never</option>
              <option value="Everyday">Everyday</option>
              <option value="Every day of the week">
                Every day of the week
              </option>
              <option value="Week-ends">Week-ends</option>
              <option value="Every week">Every week</option>
              <option value="Every 2 weeks">Every 2 weeks</option>
              <option value="Monthly">Monthly</option>
              <option value="Every 3 months">Every 3 months</option>
              <option value="Every 6 months">Every 6 months</option>
              <option value="Every year">Every year</option>
            </select>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-row items-center gap-4 border-b p-2 text-xs">
        <label className="w-4/12 text-right" htmlFor="reminder-priority">
          Priority
        </label>
        <div className="w-8/12">
          <select
            className="appearance-none bg-transparent"
            defaultValue={reminder.priority}
            id="reminder-priority"
            name="priority"
          >
            <option value="">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 text-xs">
        <div className="flex flex-row items-center gap-4">
          <label className="w-4/12 text-right" htmlFor="reminder-url">
            URL
          </label>
          <div className="w-8/12">
            <input
              className="bg-transparent"
              defaultValue={reminder.url}
              id="reminder-url"
              name="url"
              placeholder="None"
              type="url"
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          <label className="w-4/12 text-right" htmlFor="reminder-images">
            Images
          </label>
          <div className=" w-8/12">
            <input
              className="hidden"
              id="reminder-images"
              key={reminderImageValues.length}
              name="images"
              onChange={handleImageChange}
              type="file"
            />
            <div className="file-icon flex flex-row items-center gap-1">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-500 text-xs">
                +
              </span>
              <span>Add an image...</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          {reminderImageValues.map((image, index) => (
            <div className="flex flex-row items-end" key={index}>
              <img
                alt={`Thumbnail ${index}`}
                className="h-10 w-10  object-contain"
                src={URL.createObjectURL(image)}
              />
              <IoMdTrash
                onClick={(event) => handleImageTrashClick(event, image)}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
