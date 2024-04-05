import { Outlet } from "react-router-dom";

import { Sidebar } from "@components/Sidebar";

export const Root = () => {
  return (
    <div className="flex h-lvh flex-row">
      <nav className="hidden w-72 flex-col items-start justify-between bg-stone-100 p-2 md:flex">
        <Sidebar />
      </nav>

      <main className="bg-grey-50 flex-grow overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
