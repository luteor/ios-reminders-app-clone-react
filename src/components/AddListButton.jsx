import { IoIosAddCircleOutline } from "react-icons/io";

export const AddListButton = ({ setIsAddListModalOpen }) => {
  return (
    <button
      className="flex flex-row items-center gap-2"
      onClick={() => setIsAddListModalOpen(true)}
    >
      <IoIosAddCircleOutline />
      <span className="text-sm">Ajouter une liste</span>
    </button>
  );
};
