import { getDisplayColors } from "@utils/getDisplayColors";

export const ReminderListHeader = ({
  listColor,
  listTitle,
  totalListReminders,
}) => {
  const { textColorStandard } = getDisplayColors(listColor);

  return (
    <div className=" flex flex-row justify-between">
      <div className={`text-3xl font-bold ${textColorStandard}`}>
        {listTitle}
      </div>
      <div className={`text-3xl font-bold ${textColorStandard}`}>
        {totalListReminders}
      </div>
    </div>
  );
};
