import { getDisplayColors } from "@utils/getDisplayColors";

import { Reminder } from "@components/Reminder";

export const RemindersContainer = ({
  listTitle,
  listColor,
  listReminders,
  setReminderLists,
  reminderLists,
}) => {
  const { textColorStandard } = getDisplayColors(listColor);
  return (
    <div className={listTitle ? "pb-6" : ""}>
      {listTitle && listReminders.length ? (
        <div className={`pb-2 text-xl font-bold ${textColorStandard}`}>
          {listTitle}
        </div>
      ) : null}

      {listReminders.map((reminder) => (
        <Reminder
          key={reminder.id}
          reminder={reminder}
          listColor={listColor}
          setReminderLists={setReminderLists}
          reminderLists={reminderLists}
        />
      ))}
    </div>
  );
};
