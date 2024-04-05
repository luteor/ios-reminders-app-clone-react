import { useState } from "react";

import { UpdateReminderForm } from "@components/UpdateReminderForm";
import { useData } from "@hooks/useData";
import { getDisplayColors } from "@utils/colorUtils";
import { IoIosFlag, IoIosRepeat } from "react-icons/io";
import { IoCompassOutline, IoInformationCircleOutline } from "react-icons/io5";

export const Reminder = ({
  handleIconClick,
  isUpdateReminderFormOpen,
  listColor,
  reminder,
  setOpenUpdateReminderFormId,
}) => {
  const [isReminderChecked, setIsReminderChecked] = useState(reminder.state);

  const [timeoutId, setTimeoutId] = useState(null);

  const { reminderLists, setReminderLists } = useData();

  const handleReminderCheck = () => {
    setIsReminderChecked((prev) => !prev);
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      const updatedReminderLists = reminderLists.map((list) => ({
        ...list,
        reminders: list.reminders.map((reminderSearch) =>
          reminderSearch.id === reminder.id
            ? {
                ...reminderSearch,
                checkedDate: !isReminderChecked ? new Date() : "",
                state: !isReminderChecked,
              }
            : reminderSearch,
        ),
      }));
      setReminderLists(updatedReminderLists);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  const { checkedBgColor, checkedOutlineColor, textColorStandard } =
    getDisplayColors(listColor);

  const currentDate = new Date();
  let reminderDateTime;

  if (reminder.hour) {
    reminderDateTime = new Date(`${reminder.date}T${reminder.hour}`);
  } else {
    reminderDateTime = new Date(`${reminder.date}T23:59:59`);
  }

  const isPast = reminderDateTime < currentDate;

  return (
    <div className="group flex flex-row items-start justify-between border-b border-solid p-2">
      <div className="flex flex-row items-start gap-2">
        <input
          checked={isReminderChecked}
          className={`mt-0.5 flex h-4 w-4 appearance-none items-center justify-center rounded-full  ${`bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`}`}
          id="reminder-state"
          name="state"
          onChange={handleReminderCheck}
          type="checkbox"
        />
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center gap-1">
            {reminder.priority && (
              <span className={`${textColorStandard} text-xs`}>
                {reminder.priority === "Low"
                  ? "!"
                  : reminder.priority === "Medium"
                    ? "!!"
                    : reminder.priority === "High"
                      ? "!!!"
                      : ""}
              </span>
            )}
            {reminder.content && (
              <span className="text-sm font-medium">{reminder.content}</span>
            )}
          </div>

          {reminder.notes && (
            <span className="text-sm text-gray-500">{reminder.notes}</span>
          )}

          <div className="flex flex-row items-center gap-2">
            {reminder.list && (
              <span className="text-sm text-gray-500">{reminder.list}</span>
            )}
            {reminder.date && (
              <span
                className={`text-sm ${
                  isPast && !isReminderChecked
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {reminder.date}
              </span>
            )}
            {reminder.hour && (
              <span
                className={`text-sm ${
                  isPast && !isReminderChecked
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {reminder.hour}
              </span>
            )}
            {reminder.recurrence && (
              <div className="flex flex-row items-center gap-1">
                <IoIosRepeat
                  className={`h-4 w-auto ${
                    isPast && !isReminderChecked
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm ${
                    isPast && !isReminderChecked
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {reminder.recurrence}
                </span>
              </div>
            )}
            {reminder.tags &&
              reminder.tags.length > 0 &&
              reminder.tags.map((tag, index) => (
                <span className="text-sm text-sky-900" key={index}>
                  #{tag}
                </span>
              ))}
          </div>

          {reminder.checkedDate && (
            <span className="text-sm text-gray-500">
              Ended on{" "}
              {new Date(reminder.checkedDate)
                .toISOString()
                .slice(0, 16)
                .replace("T", " ")}
            </span>
          )}

          {reminder.url && (
            <a
              className="mt-1 flex max-w-fit flex-row items-center justify-start gap-1 rounded-lg bg-gray-200 px-2 py-1"
              href={reminder.url}
            >
              <IoCompassOutline
                className="h-5 w-auto text-gray-500"
                title="URL"
              />
              <span className="text-xs">
                {reminder.url.substring("https://".length)}
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center gap-3">
        <div className="relative">
          <IoInformationCircleOutline
            className=" h-6 w-auto text-blue-500 opacity-0 group-hover:opacity-100"
            onClick={(event) => handleIconClick(event, reminder.id)}
          />
          {isUpdateReminderFormOpen && (
            <UpdateReminderForm
              reminder={reminder}
              setOpenUpdateReminderFormId={setOpenUpdateReminderFormId}
            />
          )}
        </div>
        {reminder.flag ? (
          <IoIosFlag className="h-3.5 w-auto text-orange-500" />
        ) : null}
      </div>
    </div>
  );
};
