import { useState } from "react";

import { ListHeader } from "@components/ListHeader";
import { ReminderContainer } from "@components/ReminderContainer";
import { useData } from "@hooks/useData";
import { filterReminders, sortTodayReminders } from "@utils/reminderUtils";

export const TodayRemindersList = () => {
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  const { reminderLists } = useData();

  const {
    completedAfternoonReminders,
    completedEveningReminders,
    completedMorningReminders,
    completedNoHourReminders,
    completedTodayReminders,
    uncompletedAfternoonReminders,
    uncompletedEveningReminders,
    uncompletedMorningReminders,
    uncompletedNoHourReminders,
    uncompletedTodayReminders,
  } = sortTodayReminders(reminderLists);

  const filteredNoHourReminders = filterReminders(
    showCompletedReminders,
    uncompletedNoHourReminders,
    completedNoHourReminders,
  );

  const filteredMorningReminders = filterReminders(
    showCompletedReminders,
    uncompletedMorningReminders,
    completedMorningReminders,
  );

  const filteredAfternoonReminders = filterReminders(
    showCompletedReminders,
    uncompletedAfternoonReminders,
    completedAfternoonReminders,
  );

  const filteredEveningReminders = filterReminders(
    showCompletedReminders,
    uncompletedEveningReminders,
    completedEveningReminders,
  );

  return (
    <>
      <ListHeader
        listColor={"blue"}
        listTitle={"Today"}
        setShowCompletedReminders={setShowCompletedReminders}
        showCompletedReminders={showCompletedReminders}
        totalCompletedReminders={completedTodayReminders.length}
        totalUncompletedReminders={uncompletedTodayReminders.length}
      />

      {filteredNoHourReminders.length > 0 && (
        <div className="border-b border-gray-200">
          <ReminderContainer
            listColor={"blue"}
            reminders={filteredNoHourReminders}
          />
        </div>
      )}

      <div className="border-b border-gray-200">
        <div className="py-2 text-sm font-medium text-gray-500">Morning</div>
        <ReminderContainer
          listColor={"blue"}
          reminders={filteredMorningReminders}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="py-2 text-sm font-medium text-gray-500">Afternoon</div>
        <ReminderContainer
          listColor={"blue"}
          reminders={filteredAfternoonReminders}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="py-2 text-sm font-medium text-gray-500">Evening</div>
        <ReminderContainer
          listColor={"blue"}
          reminders={filteredEveningReminders}
        />
      </div>
    </>
  );
};
