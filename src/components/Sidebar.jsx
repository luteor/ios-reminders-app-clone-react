import { AddListButton } from "@components/AddListButton";
import { FavoriteList } from "@components/FavoriteList";
import { List } from "@components/List";

export const Sidebar = ({
  reminderLists,
  setReminderListDisplayedId,
  setIsAllRemindersDisplayed,
}) => {
  return (
    <div className="flex w-72 flex-col items-start justify-between bg-stone-100 p-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <FavoriteList
          listTitle={"All"}
          totalReminders={0}
          setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
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
            setIsAllRemindersDisplayed={setIsAllRemindersDisplayed}
            setReminderListDisplayedId={setReminderListDisplayedId}
          />
        ))}
      </div>
      <AddListButton />
    </div>
  );
};
