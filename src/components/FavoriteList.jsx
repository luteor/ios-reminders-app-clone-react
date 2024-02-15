export const FavoriteList = ({
  listTitle,
  totalReminders,
  setIsAllRemindersDisplayed,
}) => {
  const handleClickOnFavoriteAllLists = () => {
    setIsAllRemindersDisplayed(true);
  };
  return (
    <div
      className="flex h-auto w-32 cursor-pointer flex-col gap-1 rounded-lg bg-stone-300 p-2"
      onClick={handleClickOnFavoriteAllLists}
    >
      <div className="flex flex-row justify-between">
        <div className="h-6 w-6 rounded-full bg-slate-600"></div>
        <span className="text-xl">{totalReminders}</span>
      </div>
      <span className="text-sm">{listTitle}</span>
    </div>
  );
};
