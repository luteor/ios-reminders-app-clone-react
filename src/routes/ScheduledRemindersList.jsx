import { useState } from "react";

import { ListHeader } from "@components/ListHeader";
import { ReminderContainer } from "@components/ReminderContainer";
import { useData } from "@hooks/useData";
import { filterReminders, sortScheduledReminders } from "@utils/reminderUtils";

export const ScheduledRemindersList = () => {
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  const { reminderLists } = useData();

  const {
    completedOverdueReminders,
    completedScheduledReminders,
    completedTodayReminders,
    completedUpcomingReminders,
    uncompletedOverdueReminders,
    uncompletedScheduledReminders,
    uncompletedTodayReminders,
    uncompletedUpcomingReminders,
  } = sortScheduledReminders(reminderLists);

  const filteredOverdueReminders = filterReminders(
    showCompletedReminders,
    uncompletedOverdueReminders,
    completedOverdueReminders,
  );

  const filteredTodayReminders = filterReminders(
    showCompletedReminders,
    uncompletedTodayReminders,
    completedTodayReminders,
  );

  const filteredUpcomingReminders = filterReminders(
    showCompletedReminders,
    uncompletedUpcomingReminders,
    completedUpcomingReminders,
  );

  return (
    <>
      <ListHeader
        listColor={"red"}
        listTitle={"Scheduled"}
        setShowCompletedReminders={setShowCompletedReminders}
        showCompletedReminders={showCompletedReminders}
        totalCompletedReminders={completedScheduledReminders.length}
        totalUncompletedReminders={uncompletedScheduledReminders.length}
      />

      <div className="border-b border-gray-200">
        <div
          className="py-2 text-xl font-semibold
         text-black"
        >
          Overdue
        </div>
        <ReminderContainer
          listColor={"red"}
          reminders={filteredOverdueReminders}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="py-2 text-xl font-semibold text-black">Today</div>
        <ReminderContainer
          listColor={"red"}
          reminders={filteredTodayReminders}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="py-2 text-xl font-semibold text-black">Upcoming</div>
        <ReminderContainer
          listColor={"red"}
          reminders={filteredUpcomingReminders}
        />
      </div>
    </>
  );
};
