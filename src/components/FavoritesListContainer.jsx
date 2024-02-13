import { FavoriteList } from "./FavoriteList";

export const FavoritesListContainer = () => {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-2">
      <FavoriteList />
      <FavoriteList />
      <FavoriteList />
      <FavoriteList />
      <FavoriteList />
    </div>
  );
};
