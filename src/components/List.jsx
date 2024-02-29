import { getDisplayColors } from "@utils/getDisplayColors";
import { IoListSharp } from "react-icons/io5";

export const List = ({
  listColor,
  listIcon,
  listId,
  listTitle,
  setIsAllRemindersDisplayed,
  setIsCompletedRemindersDisplayed,
  setIsWithFlagRemindersDisplayed,
  setReminderListDisplayedId,
}) => {
  const handleClickOnList = () => {
    setReminderListDisplayedId(listId);
    setIsAllRemindersDisplayed(false);
    setIsWithFlagRemindersDisplayed(false);
    setIsCompletedRemindersDisplayed(false);
  };

  const { bgColorLight, bgColorStandard } = getDisplayColors(listColor);

  return (
    <div
      className="flex cursor-pointer flex-row items-center justify-start gap-2 "
      onClick={handleClickOnList}
    >
      {listIcon ? (
        <div
          className={`h-7 w-7 cursor-pointer appearance-none rounded-full ${bgColorLight} flex items-center justify-center`}
        >
          <span>{listIcon}</span>
        </div>
      ) : (
        <div
          className={`h-7 w-7 cursor-pointer appearance-none rounded-full ${bgColorStandard} flex items-center justify-center`}
        >
          <IoListSharp className=" h-4 w-4 text-white" />
        </div>
      )}
      <div>{listTitle}</div>
    </div>
  );
};
