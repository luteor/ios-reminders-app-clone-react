import { Reminder } from "@components/Reminder";
import { getDisplayColors } from "@utils/getDisplayColors";

export const RemindersContainer = ({
  isAllRemindersDisplayed,
  isCompletedRemindersDisplayed,
  isWithFlagRemindersDisplayed,
  listColor,
  listReminders,
  listTitle,
  reminderLists,
  setReminderLists,
}) => {
  const { textColorStandard } = getDisplayColors(listColor);
  return (
    <div className={listTitle ? "pb-6" : ""}>
      {listTitle && listReminders.length && !isCompletedRemindersDisplayed ? (
        <div className={`pb-2 text-xl font-bold ${textColorStandard}`}>
          {listTitle}
        </div>
      ) : null}

      {isAllRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            key={reminder.id}
            listColor={listColor}
            reminder={reminder}
            reminderLists={reminderLists}
            setReminderLists={setReminderLists}
          />
        ))}

      {isCompletedRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            key={reminder.id}
            listColor={"gray"}
            reminder={reminder}
            reminderLists={reminderLists}
            setReminderLists={setReminderLists}
          />
        ))}

      {isWithFlagRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            key={reminder.id}
            listColor={"orange"}
            reminder={reminder}
            reminderLists={reminderLists}
            setReminderLists={setReminderLists}
          />
        ))}

      {!isAllRemindersDisplayed &&
        !isCompletedRemindersDisplayed &&
        !isWithFlagRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            key={reminder.id}
            listColor={listColor}
            reminder={reminder}
            reminderLists={reminderLists}
            setReminderLists={setReminderLists}
          />
        ))}
    </div>
  );
};
