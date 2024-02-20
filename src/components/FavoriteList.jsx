import { IoCheckmarkOutline, IoFileTraySharp } from "react-icons/io5";

export const FavoriteList = ({
  listTitle,
  totalReminders,
  setIsAllRemindersDisplayed,
  setReminderListDisplayedId,
  setIsCompletedRemindersDisplayed,
}) => {
  const handleClickOnFavoriteAllLists = () => {
    setReminderListDisplayedId(null);

    if (listTitle === "All") {
      setIsAllRemindersDisplayed(true);
      setIsCompletedRemindersDisplayed(false);
    }
    if (listTitle === "Completed") {
      setIsAllRemindersDisplayed(false);
      setIsCompletedRemindersDisplayed(true);
    }
  };
  return (
    <div
      className="flex h-auto w-32 cursor-pointer flex-col gap-1 rounded-lg bg-stone-300 p-2"
      onClick={handleClickOnFavoriteAllLists}
    >
      <div className="flex flex-row justify-between">
        {listTitle === "All" && (
          <div
            className={`flex h-6 w-6 appearance-none  items-center justify-center rounded-full bg-gray-900`}
          >
            <IoFileTraySharp className=" h-4 w-4 text-white" />
          </div>
        )}
        {listTitle === "Completed" && (
          <div
            className={`flex h-6 w-6 appearance-none  items-center justify-center rounded-full bg-gray-500`}
          >
            <IoCheckmarkOutline className=" h-5 w-5 text-white" />
          </div>
        )}
        {listTitle === "All" && (
          <span className="text-xl font-bold">{totalReminders}</span>
        )}
      </div>
      <span className="text-sm">{listTitle}</span>
    </div>
  );
};
