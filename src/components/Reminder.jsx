export const Reminder = ({ reminder, setReminderLists, reminderLists }) => {
  const handleCheckReminder = () => {
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
  };

  return (
    <div className="flex flex-row items-center justify-start gap-2 border-b border-solid pb-2 pl-2">
      <input
        type="checkbox"
        name="reminder"
        id="reminder"
        checked={reminder.state}
        className="h-4 w-4 appearance-none rounded-full border border-gray-400"
        onChange={handleCheckReminder}
      />
      <label htmlFor="reminder">{reminder.content}</label>
    </div>
  );
};
