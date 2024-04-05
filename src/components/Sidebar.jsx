import { useState } from "react";

import { AddListButton } from "@components/AddListButton";
import { AddListModal } from "@components/AddListModal";
import { FavoriteList } from "@components/FavoriteList";
import { List } from "@components/List";
import { useData } from "@hooks/useData";
import {
  sortAllReminders,
  sortFlaggedReminders,
  sortRemindersByListId,
  sortScheduledReminders,
  sortTodayReminders,
} from "@utils/reminderUtils";
import {
  IoCalendarNumberOutline,
  IoCalendarOutline,
  IoCheckmarkOutline,
  IoFileTraySharp,
  IoFlag,
} from "react-icons/io5";

export const Sidebar = () => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);

  const { reminderLists } = useData();

  const { uncompletedTodayReminders } = sortTodayReminders(reminderLists);
  const { uncompletedScheduledReminders } =
    sortScheduledReminders(reminderLists);
  const { uncompletedFlaggedReminders } = sortFlaggedReminders(reminderLists);
  const { uncompletedAllReminders } = sortAllReminders(reminderLists);

  return (
    <>
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <FavoriteList
          listColor={"blue"}
          listIcon={<IoCalendarNumberOutline />}
          listTitle={"Today"}
          listUrl={"today-reminders-list"}
          totalReminders={uncompletedTodayReminders.length}
        />
        <FavoriteList
          listColor={"red"}
          listIcon={<IoCalendarOutline />}
          listTitle={"Scheduled"}
          listUrl={"scheduled-reminders-list"}
          totalReminders={uncompletedScheduledReminders.length}
        />
        <FavoriteList
          listColor={"black"}
          listIcon={<IoFileTraySharp />}
          listTitle={"All"}
          listUrl={"all-reminders-list"}
          totalReminders={uncompletedAllReminders.length}
        />
        <FavoriteList
          listColor={"orange"}
          listIcon={<IoFlag />}
          listTitle={"With flag"}
          listUrl={"flagged-reminders-list"}
          totalReminders={uncompletedFlaggedReminders.length}
        />
        <FavoriteList
          listColor={"gray"}
          listIcon={<IoCheckmarkOutline />}
          listTitle={"Completed"}
          listUrl={"completed-reminders-list"}
          totalReminders={null}
        />
      </div>

      <div className="flex w-full flex-col gap-2 p-2">
        <div className="pb-2 text-xs font-semibold text-gray-400">My lists</div>
        {reminderLists.map((list) => {
          const { uncompletedListReminders } = sortRemindersByListId(
            reminderLists,
            list.id,
          );

          return (
            <List
              key={list.id}
              listColor={list.color}
              listIcon={list.icon}
              listId={list.id}
              listTitle={list.name}
              totalReminders={uncompletedListReminders.length}
            />
          );
        })}
      </div>

      <AddListButton setIsAddListModalOpen={setIsAddListModalOpen} />

      {isAddListModalOpen && (
        <AddListModal
          reminderLists={reminderLists}
          setIsAddListModalOpen={setIsAddListModalOpen}
        />
      )}
    </>
  );
};
