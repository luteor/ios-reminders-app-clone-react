import { getDisplayColors } from "@utils/getDisplayColors";

export const Reminder = ({
  reminder,
  listColor,
  setReminderLists,
  reminderLists,
  isCompletedRemindersDisplayed,
}) => {
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
    <div className="flex flex-row items-center justify-start gap-2 border-b border-solid pb-2 pl-2">
      <input
        type="checkbox"
        name="reminder"
        id="reminder"
        className={`peer flex h-4 w-4 appearance-none items-center justify-center rounded-full  ${
          isCompletedRemindersDisplayed
            ? "border-none bg-gray-500 outline outline-1 outline-offset-1 outline-gray-500 checked:border checked:border-solid checked:border-gray-400 checked:bg-white checked:outline-none"
            : `bg-white ${checkedBgColor} ${checkedOutlineColor} border border-solid border-gray-400 checked:border-none checked:outline checked:outline-1 checked:outline-offset-1`
        }`}
        onChange={handleCheckReminder}
      />

      <label htmlFor="reminder">{reminder.content}</label>
    </div>
  );
};
