export const List = ({ listId, listTitle, setReminderListDisplayedId }) => {
  const handleClickListItem = () => {
    setReminderListDisplayedId(listId);
  };

  return (
    <div
      className="flex flex-row cursor-pointer items-center gap-2 justify-start "
      onClick={handleClickListItem}
    >
      <i className="h-6 w-6 rounded-full bg-slate-600"></i>
      <span>{listTitle}</span>
    </div>
  );
};
