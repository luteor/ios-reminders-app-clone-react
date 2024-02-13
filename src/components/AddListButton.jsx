import { IoIosAddCircleOutline } from "react-icons/io";

export const AddListButton = () => {
  return (
    <button className="flex flex-row items-center gap-2">
      <IoIosAddCircleOutline />
      <span className="text-sm">Ajouter une liste</span>
    </button>
  );
};
