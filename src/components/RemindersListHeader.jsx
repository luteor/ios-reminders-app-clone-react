export const RemindersListHeader = ({ listTitle, remindersTotal }) => {
  return (
    <div className=" flex flex-row justify-between">
      <div className="text-3xl">{listTitle}</div>
      <div className="text-3xl">{remindersTotal}</div>
    </div>
  );
};
