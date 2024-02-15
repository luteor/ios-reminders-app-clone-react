export const List = ({ listTitle }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <i className="h-6 w-6 rounded-full bg-slate-600"></i>
      <span>{listTitle}</span>
    </div>
  );
};
