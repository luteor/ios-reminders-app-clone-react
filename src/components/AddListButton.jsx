import { IoIosAddCircleOutline } from "react-icons/io";

export const AddListButton = ({ setIsAddListModalOpen }) => {
  return (
    <button
      className="flex flex-row items-center gap-2"
      onClick={() => setIsAddListModalOpen(true)}
    >
      <IoIosAddCircleOutline className="text-gray-700" />
      <span className="text-sm font-medium text-gray-500">Add a list</span>
    </button>
  );
};
