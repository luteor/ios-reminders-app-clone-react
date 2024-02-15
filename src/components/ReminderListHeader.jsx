export const ReminderListHeader = ({
  isAllRemindersDisplayed,
  reminderData,
  reminderList,
}) => {
  const totalAllReminders = reminderData.reduce(
    (total, list) => total + list.reminders.length,
    0,
  );
  return (
    <>
      {isAllRemindersDisplayed ? (
        <div className=" flex flex-row justify-between">
          <div className="text-3xl">All</div>
          <div className="text-3xl">{totalAllReminders.toString()}</div>
        </div>
      ) : (
        <div className=" flex flex-row justify-between">
          <div className="text-3xl">{reminderList.name}</div>
          <div className="text-3xl">
            {reminderList.reminders.length.toString()}
          </div>
        </div>
      )}
    </>
  );
};
