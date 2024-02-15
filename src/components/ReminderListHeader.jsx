export const ReminderListHeader = ({ listTitle, totalReminders }) => {
  return (
    <div className=" flex flex-row justify-between">
      <div className="text-3xl">{listTitle}</div>
      <div className="text-3xl">{totalReminders}</div>
    </div>
  );
};
