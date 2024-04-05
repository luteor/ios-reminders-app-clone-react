import { IoIosAdd } from "react-icons/io";

export const AddReminderButton = ({
  isAddReminderFormOpen,
  setIsAddReminderFormOpen,
}) => {
  const handleAddReminderButtonClick = (event) => {
    if (!isAddReminderFormOpen) {
      event.stopPropagation();
    }
    setIsAddReminderFormOpen(true);
  };
  return (
    <button
      className="flex flex-row justify-end pb-6"
      onClick={handleAddReminderButtonClick}
    >
      <IoIosAdd className="text-gray-500" size={30} />
    </button>
  );
};
