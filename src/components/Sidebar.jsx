import { AddListButton } from "./AddListButton";
import { FavoritesListContainer } from "./FavoritesListContainer";
import { ListContainer } from "./ListsContainer";

export const Sidebar = () => {
  return (
    <div className="flex w-72 flex-col items-start justify-between bg-stone-100 p-2">
      <FavoritesListContainer />
      <ListContainer />
      <AddListButton />
    </div>
  );
};
