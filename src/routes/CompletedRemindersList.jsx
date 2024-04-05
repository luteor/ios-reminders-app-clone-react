import { ListHeader } from "@components/ListHeader";
import { ReminderContainer } from "@components/ReminderContainer";
import { useData } from "@hooks/useData";
import { sortCompletedReminders } from "@utils/reminderUtils";

export const CompletedRemindersList = () => {
  const { reminderLists } = useData();

  const {
    completedReminders,
    remindersFromLast7Days,
    remindersFromLast30Days,
    remindersOlderThan30Days,
  } = sortCompletedReminders(reminderLists);

  return (
    <>
      <ListHeader
        listColor={"gray"}
        listTitle={"Completed"}
        setShowCompletedReminders={null}
        showCompletedReminders={null}
        totalCompletedReminders={completedReminders.length}
        totalUncompletedReminders={null}
      />

      <div className="border-b border-gray-200">
        <div className="py-2 text-xl font-semibold text-black">
          Previous 7 days
        </div>
        <ReminderContainer
          listColor={"gray"}
          reminders={remindersFromLast7Days}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="py-2 text-xl font-semibold text-black">
          Previous 30 days
        </div>
        <ReminderContainer
          listColor={"gray"}
          reminders={remindersFromLast30Days}
        />
      </div>

      <div className="border-b border-gray-200">
        <div className="py-2 text-xl font-semibold text-black">Older</div>
        <ReminderContainer
          listColor={"gray"}
          reminders={remindersOlderThan30Days}
        />
      </div>
    </>
  );
};
