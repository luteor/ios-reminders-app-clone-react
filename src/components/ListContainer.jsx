import { List } from "@components/List";

export const ListContainer = ({ reminderLists }) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      <div className="pb-2 text-sm">Mes listes</div>
      {reminderLists.map((list) => (
        <List key={list.id} listTitle={list.name} />
      ))}
    </div>
  );
};
