import { AddListButton } from "@components/AddListButton";
import { AddListModal } from "@components/AddListModal";
import { FavoriteList } from "@components/FavoriteList";
import { List } from "@components/List";

export const Sidebar = ({
  reminderLists,
  setReminderLists,
  setReminderListDisplayedId,
  setIsAllRemindersDisplayed,
  setIsCompletedRemindersDisplayed,
  setIsAddListModalOpen,
  isAddListModalOpen,
}) => {
  const totalAllReminders = reminderLists.reduce((total, list) => {
    return (
      total +
      list.reminders.filter((reminder) => reminder.state === false).length
    );
  }, 0);

  const totalCompletedReminders = reminderLists.reduce((total, list) => {
    return (
      total +
      list.reminders.filter((reminder) => reminder.state === true).length
    );
  }, 0);

  return (
    <div className="flex w-72 flex-col items-start justify-between bg-stone-100 p-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <FavoriteList
          listTitle={"All"}
          totalReminders={totalAllReminders}
          setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
          setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
          setReminderListDisplayedId={setReminderListDisplayedId}
        />
        <FavoriteList
          listTitle={"Completed"}
          totalReminders={totalCompletedReminders}
          setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
          setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
          setReminderListDisplayedId={setReminderListDisplayedId}
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="pb-2 text-sm">Mes listes</div>
        {reminderLists.map((list) => (
          <List
            key={list.id}
            listId={list.id}
            listTitle={list.name}
            listColor={list.color}
            listIcon={list.icon}
            setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
            setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
            setReminderListDisplayedId={setReminderListDisplayedId}
          />
        ))}
      </div>
      <AddListButton setIsAddListModalOpen={setIsAddListModalOpen} />
      {isAddListModalOpen && (
        <AddListModal
          setIsAddListModalOpen={setIsAddListModalOpen}
          reminderLists={reminderLists}
          setReminderLists={setReminderLists}
        />
      )}
    </div>
  );
};
