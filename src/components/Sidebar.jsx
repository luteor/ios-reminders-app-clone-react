import { AddListButton } from "@components/AddListButton";
import { FavoriteList } from "@components/FavoriteList";
import { List } from "@components/List";

export const Sidebar = ({ reminderLists }) => {
  return (
    <div className="flex w-72 flex-col items-start justify-between bg-stone-100 p-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <FavoriteList listTitle={"Today"} totalReminders={0} />
        <FavoriteList listTitle={"Scheduled"} totalReminders={0} />
        <FavoriteList listTitle={"All"} totalReminders={0} />
        <FavoriteList listTitle={"Completed"} totalReminders={0} />
      </div>
      <div className="flex flex-col p-2 gap-2">
        <div className="pb-2 text-sm">Mes listes</div>
        {reminderLists.map((list) => (
          <List key={list.id} listTitle={list.name} />
        ))}
      </div>

      <AddListButton />
    </div>
  );
};
