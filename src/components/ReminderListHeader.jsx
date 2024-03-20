import { getDisplayColors } from "@utils/getDisplayColors";

export const ReminderListHeader = ({
  listColor,
  listTitle,
  totalListReminders,
}) => {
  const { textColorStandard } = getDisplayColors(listColor);

  return (
    <div className=" flex flex-row justify-between">
      <div className={`text-4xl font-bold ${textColorStandard}`}>
        {listTitle}
      </div>
      <div className={`text-4xl ${textColorStandard}`}>
        {totalListReminders}
      </div>
    </div>
  );
};
