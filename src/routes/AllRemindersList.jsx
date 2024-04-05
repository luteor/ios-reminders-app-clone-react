import { useState } from "react";

import { ListHeader } from "@components/ListHeader";
import { ReminderContainer } from "@components/ReminderContainer";
import { useData } from "@hooks/useData";
import { getDisplayColors } from "@utils/colorUtils";
import {
  filterReminders,
  separateReminders,
  sortAllReminders,
} from "@utils/reminderUtils";

export const AllRemindersList = () => {
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  const { reminderLists } = useData();

  const { completedAllReminders, uncompletedAllReminders } =
    sortAllReminders(reminderLists);

  return (
    <>
      <ListHeader
        listColor={"black"}
        listTitle={"All"}
        setShowCompletedReminders={setShowCompletedReminders}
        showCompletedReminders={showCompletedReminders}
        totalCompletedReminders={completedAllReminders.length}
        totalUncompletedReminders={uncompletedAllReminders.length}
      />

      {reminderLists.map((list) => {
        const { completedReminders, uncompletedReminders } = separateReminders(
          list.reminders,
        );

        const filteredReminders = filterReminders(
          showCompletedReminders,
          uncompletedReminders,
          completedReminders,
        );

        const { textColorStandard } = getDisplayColors(list.color);

        return (
          <div className="border-b border-gray-200" key={list.id}>
            <div className={`py-2 text-xl font-semibold ${textColorStandard}`}>
              {list.name}
            </div>

            <ReminderContainer
              listColor={list.color}
              reminders={filteredReminders}
            />
          </div>
        );
      })}
    </>
  );
};
