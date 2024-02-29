import { IoCheckmarkOutline, IoFileTraySharp, IoFlag } from "react-icons/io5";

export const FavoriteList = ({
  listTitle,
  setIsAllRemindersDisplayed,
  setIsCompletedRemindersDisplayed,
  setIsWithFlagRemindersDisplayed,
  setReminderListDisplayedId,
  totalReminders,
}) => {
  const handleClickOnFavoriteAllLists = () => {
    setReminderListDisplayedId(null);

    if (listTitle === "All") {
      setIsAllRemindersDisplayed(true);
      setIsWithFlagRemindersDisplayed(false);
      setIsCompletedRemindersDisplayed(false);
    }
    if (listTitle === "With flag") {
      setIsAllRemindersDisplayed(false);
      setIsWithFlagRemindersDisplayed(true);
      setIsCompletedRemindersDisplayed(false);
    }
    if (listTitle === "Completed") {
      setIsAllRemindersDisplayed(false);
      setIsWithFlagRemindersDisplayed(false);
      setIsCompletedRemindersDisplayed(true);
    }
  };
  return (
    <div
      className="flex h-auto w-32 cursor-pointer flex-col justify-between gap-1 rounded-lg bg-stone-300 p-2"
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
        {listTitle === "With flag" && (
          <div
            className={`flex h-6 w-6 appearance-none  items-center justify-center rounded-full bg-orange-400`}
          >
            <IoFlag className=" h-3.5 w-3.5 text-white" />
          </div>
        )}
        {listTitle === "Completed" && (
          <div
            className={`flex h-6 w-6 appearance-none  items-center justify-center rounded-full bg-gray-500`}
          >
            <IoCheckmarkOutline className=" h-5 w-5 text-white" />
          </div>
        )}
        {listTitle !== "Completed" && (
          <span className="text-xl font-bold">{totalReminders}</span>
        )}
      </div>
      <span className="text-sm">{listTitle}</span>
    </div>
  );
};
