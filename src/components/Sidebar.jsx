import { AddListButton } from "@components/AddListButton";
import { AddListModal } from "@components/AddListModal";
import { FavoriteList } from "@components/FavoriteList";
import { List } from "@components/List";

export const Sidebar = ({
  isAddListModalOpen,
  reminderLists,
  setIsAddListModalOpen,
  setIsAllRemindersDisplayed,
  setIsCompletedRemindersDisplayed,
  setIsWithFlagRemindersDisplayed,
  setReminderListDisplayedId,
  setReminderLists,
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

  const totalFlagsReminders = reminderLists.reduce((total, list) => {
    return (
      total + list.reminders.filter((reminder) => reminder.flag === true).length
    );
  }, 0);

  return (
    <div className="flex w-72 flex-col items-start justify-between bg-stone-100 p-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <FavoriteList
          listTitle={"All"}
          setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
          setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
          setIsWithFlagRemindersDisplayed={setIsWithFlagRemindersDisplayed}
          setReminderListDisplayedId={setReminderListDisplayedId}
          totalReminders={totalAllReminders}
        />
        <FavoriteList
          listTitle={"With flag"}
          setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
          setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
          setIsWithFlagRemindersDisplayed={setIsWithFlagRemindersDisplayed}
          setReminderListDisplayedId={setReminderListDisplayedId}
          totalReminders={totalFlagsReminders}
        />
        <FavoriteList
          listTitle={"Completed"}
          setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
          setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
          setIsWithFlagRemindersDisplayed={setIsWithFlagRemindersDisplayed}
          setReminderListDisplayedId={setReminderListDisplayedId}
          totalReminders={totalCompletedReminders}
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="pb-2 text-sm">Mes listes</div>
        {reminderLists.map((list) => (
          <List
            key={list.id}
            listColor={list.color}
            listIcon={list.icon}
            listId={list.id}
            listTitle={list.name}
            setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
            setIsCompletedRemindersDisplayed={setIsCompletedRemindersDisplayed}
            setIsWithFlagRemindersDisplayed={setIsWithFlagRemindersDisplayed}
            setReminderListDisplayedId={setReminderListDisplayedId}
          />
        ))}
      </div>
      <AddListButton setIsAddListModalOpen={setIsAddListModalOpen} />
      {isAddListModalOpen && (
        <AddListModal
          reminderLists={reminderLists}
          setIsAddListModalOpen={setIsAddListModalOpen}
          setReminderLists={setReminderLists}
        />
      )}
    </div>
  );
};
