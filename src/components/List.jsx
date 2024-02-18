export const List = ({
  listId,
  listTitle,
  setReminderListDisplayedId,
  setIsAllRemindersDisplayed,
  setIsCompletedRemindersDisplayed,
}) => {
  const handleClickOnList = () => {
    setReminderListDisplayedId(listId);
    setIsAllRemindersDisplayed(false);
    setIsCompletedRemindersDisplayed(false);
  };

  return (
    <div
      className="flex cursor-pointer flex-row items-center justify-start gap-2 "
      onClick={handleClickOnList}
    >
      <i className="h-6 w-6 rounded-full bg-slate-600"></i>
      <span>{listTitle}</span>
    </div>
  );
};
