export const Reminder = ({ reminder }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 border-b border-solid pb-2 pl-2">
      <input
        type="checkbox"
        name="reminder"
        id=""
        className="h-4 w-4 appearance-none rounded-full border border-gray-400"
      />
      <label htmlFor="reminder">{reminder.content}</label>
    </div>
  );
};
