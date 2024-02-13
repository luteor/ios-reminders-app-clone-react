import { List } from "./List";

export const ListContainer = () => {
  return (
    <div className="flex flex-col p-2">
      <div className="pb-2 text-sm">Mes listes</div>
      <List />
    </div>
  );
};
