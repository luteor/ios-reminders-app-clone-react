export const Home = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-5 text-gray-500">
        <h1 className="text-center text-4xl font-semibold">
          macOS Reminders Clone
        </h1>
        <p className="hidden text-center text-lg md:block">
          Select a list of reminders in the sidebar or create your own
        </p>
        <div className=" flex flex-col items-center justify-center gap-2 text-center text-lg md:hidden">
          <span>Please note:</span>
          <p>
            This application is primarily designed for use on desktops like the
            macOS
          </p>
        </div>
      </div>
    </>
  );
};
