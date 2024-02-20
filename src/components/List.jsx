import { IoListSharp } from "react-icons/io5";

export const List = ({
  listId,
  listTitle,
  listColor,
  listIcon,
  setReminderListDisplayedId,
  setIsAllRemindersDisplayed,
  setIsCompletedRemindersDisplayed,
}) => {
  const handleClickOnList = () => {
    setReminderListDisplayedId(listId);
    setIsAllRemindersDisplayed(false);
    setIsCompletedRemindersDisplayed(false);
  };

  const standardColorDisplay = `bg-${listColor}-500`;
  const lightColorDisplay = `bg-${listColor}-200`;

  return (
    <div
      className="flex cursor-pointer flex-row items-center justify-start gap-2 "
      onClick={handleClickOnList}
    >
      {listIcon ? (
        <div
          className={`h-8 w-8 cursor-pointer appearance-none rounded-full ${lightColorDisplay} flex items-center justify-center`}
        >
          <span>{listIcon}</span>
        </div>
      ) : (
        <div
          className={`h-8 w-8 cursor-pointer appearance-none rounded-full ${standardColorDisplay} flex items-center justify-center`}
        >
          <IoListSharp className=" h-5 w-5 text-white" />
        </div>
      )}

      <div>{listTitle}</div>
    </div>
  );
};
