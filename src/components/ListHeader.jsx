import { getDisplayColors } from "@utils/colorUtils";

export const ListHeader = ({
  listColor,
  listTitle,
  setShowCompletedReminders,
  showCompletedReminders,
  totalCompletedReminders,
  totalUncompletedReminders,
}) => {
  const { textColorStandard } = getDisplayColors(listColor);

  return (
    <div className="flex flex-col gap-4">
      <div className=" flex flex-row justify-between">
        <div className={`text-4xl font-bold ${textColorStandard}`}>
          {listTitle}
        </div>
        <div className={`text-4xl ${textColorStandard}`}>
          {totalUncompletedReminders}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between border-b border-gray-200 pb-2 text-sm">
        <div className="flex flex-row gap-1">
          <span className={`text-gray-500 `}>
            {totalCompletedReminders} completed •
          </span>
          <button>Clear</button>
        </div>
        {setShowCompletedReminders !== null && (
          <button
            className={`${textColorStandard}`}
            onClick={() => {
              setShowCompletedReminders((prev) => !prev);
            }}
          >
            {showCompletedReminders ? "Hide" : "View"}
          </button>
        )}
      </div>
    </div>
  );
};
