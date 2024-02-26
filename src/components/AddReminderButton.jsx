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
    <div className="flex flex-row justify-end pb-6">
      <button onClick={handleAddReminderButtonClick}>
        <IoIosAdd size={30} />
      </button>
    </div>
  );
};
