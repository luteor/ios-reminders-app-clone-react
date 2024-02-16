export const ReminderListHeader = ({ listTitle, totalListReminders }) => {
  return (
    <div className=" flex flex-row justify-between">
      <div className="text-3xl">{listTitle}</div>
      <div className="text-3xl">{totalListReminders}</div>
    </div>
  );
};
