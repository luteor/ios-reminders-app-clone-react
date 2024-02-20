import { listColors } from "@assets/listColors";
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

  const getDisplayColors = (listColors) => {
    const color = listColors.find((color) => color.name === listColor);
    return {
      colorDisplay200: color.colorDisplay200,
      colorDisplay500: color.colorDisplay500,
    };
  };

  const { colorDisplay200, colorDisplay500 } = getDisplayColors(listColors);

  return (
    <div
      className="flex cursor-pointer flex-row items-center justify-start gap-2 "
      onClick={handleClickOnList}
    >
      {listIcon ? (
        <div
          className={`h-7 w-7 cursor-pointer appearance-none rounded-full ${colorDisplay200} flex items-center justify-center`}
        >
          <span>{listIcon}</span>
        </div>
      ) : (
        <div
          className={`h-7 w-7 cursor-pointer appearance-none rounded-full ${colorDisplay500} flex items-center justify-center`}
        >
          <IoListSharp className=" h-4 w-4 text-white" />
        </div>
      )}
      <div>{listTitle}</div>
    </div>
  );
};
