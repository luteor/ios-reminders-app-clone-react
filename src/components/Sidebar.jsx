import { AddListButton } from "@components/AddListButton";
import { FavoriteListContainer } from "@components/FavoriteListContainer";
import { ListContainer } from "@components/ListContainer";

export const Sidebar = ({ reminderLists }) => {
  return (
    <div className="flex w-72 flex-col items-start justify-between bg-stone-100 p-2">
      <FavoriteListContainer />
      <ListContainer reminderLists={reminderLists} />
      <AddListButton />
    </div>
  );
};
