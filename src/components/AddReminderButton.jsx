import { IoIosAdd } from "react-icons/io";

export const AddReminderButton = () => {
  return (
    <div className="flex flex-row justify-end pb-6">
      <button>
        <IoIosAdd size={30} />
      </button>
    </div>
  );
};
