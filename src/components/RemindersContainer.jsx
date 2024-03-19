import { useState } from "react";

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
  const [openUpdateReminderFormId, setOpenUpdateReminderFormId] =
    useState(null);

  const handleIconClick = (event, id) => {
    event.stopPropagation();
    setOpenUpdateReminderFormId(openUpdateReminderFormId === id ? null : id);
  };

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
            handleIconClick={handleIconClick}
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            isUpdateReminderFormOpen={openUpdateReminderFormId === reminder.id}
            key={reminder.id}
            listColor={listColor}
            reminder={reminder}
            reminderLists={reminderLists}
            setOpenUpdateReminderFormId={setOpenUpdateReminderFormId}
            setReminderLists={setReminderLists}
          />
        ))}

      {isCompletedRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            handleIconClick={handleIconClick}
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            isUpdateReminderFormOpen={openUpdateReminderFormId === reminder.id}
            key={reminder.id}
            listColor={"gray"}
            reminder={reminder}
            reminderLists={reminderLists}
            setOpenUpdateReminderFormId={setOpenUpdateReminderFormId}
            setReminderLists={setReminderLists}
          />
        ))}

      {isWithFlagRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            handleIconClick={handleIconClick}
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            isUpdateReminderFormOpen={openUpdateReminderFormId === reminder.id}
            key={reminder.id}
            listColor={"orange"}
            reminder={reminder}
            reminderLists={reminderLists}
            setOpenUpdateReminderFormId={setOpenUpdateReminderFormId}
            setReminderLists={setReminderLists}
          />
        ))}

      {!isAllRemindersDisplayed &&
        !isCompletedRemindersDisplayed &&
        !isWithFlagRemindersDisplayed &&
        listReminders.map((reminder) => (
          <Reminder
            handleIconClick={handleIconClick}
            isCompletedRemindersDisplayed={isCompletedRemindersDisplayed}
            isUpdateReminderFormOpen={openUpdateReminderFormId === reminder.id}
            key={reminder.id}
            listColor={listColor}
            reminder={reminder}
            reminderLists={reminderLists}
            setOpenUpdateReminderFormId={setOpenUpdateReminderFormId}
            setReminderLists={setReminderLists}
          />
        ))}
    </div>
  );
};
