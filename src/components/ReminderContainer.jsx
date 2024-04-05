import { useState } from "react";

import { Reminder } from "@components/Reminder";

export const ReminderContainer = ({ listColor, reminders }) => {
  const [openUpdateReminderFormId, setOpenUpdateReminderFormId] =
    useState(null);

  const handleIconClick = (event, id) => {
    event.stopPropagation();
    setOpenUpdateReminderFormId(openUpdateReminderFormId === id ? null : id);
  };

  return (
    <>
      {reminders.map((reminder) => (
        <Reminder
          handleIconClick={handleIconClick}
          isUpdateReminderFormOpen={openUpdateReminderFormId === reminder.id}
          key={reminder.id}
          listColor={listColor}
          reminder={reminder}
          setOpenUpdateReminderFormId={setOpenUpdateReminderFormId}
        />
      ))}
    </>
  );
};
