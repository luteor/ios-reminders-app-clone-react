import { IoListSharp } from "react-icons/io5";

import { getDisplayColors } from "@utils/getDisplayColors";

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
