import { FavoriteList } from "@components/FavoriteList";

export const FavoriteListContainer = () => {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-2">
      <FavoriteList listTitle={"Today"} totalReminders={0} />
      <FavoriteList listTitle={"Scheduled"} totalReminders={0} />
      <FavoriteList listTitle={"All"} totalReminders={0} />
      <FavoriteList listTitle={"Completed"} totalReminders={0} />
    </div>
  );
};
