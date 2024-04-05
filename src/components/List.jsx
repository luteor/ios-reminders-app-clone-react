import { NavLink } from "react-router-dom";

import { getDisplayColors } from "@utils/colorUtils";
import { IoListSharp } from "react-icons/io5";

export const List = ({
  listColor,
  listIcon,
  listId,
  listTitle,
  totalReminders,
}) => {
  const { bgColorLight, bgColorStandard } = getDisplayColors(listColor);

  return (
    <NavLink
      className={({ isActive }) =>
        `flex cursor-pointer flex-row items-center justify-between  rounded-md px-2 py-1 ${
          isActive ? "bg-blue-400" : ""
        }`
      }
      to={`reminder-lists/${listId}`}
    >
      {({ isActive }) => (
        <>
          <div className="flex flex-row items-center gap-2">
            {listIcon ? (
              <div
                className={`h-7 w-7 cursor-pointer appearance-none rounded-full ${bgColorLight} flex items-center justify-center`}
              >
                <span>{listIcon}</span>
              </div>
            ) : (
              <div
                className={`h-7 w-7 cursor-pointer appearance-none rounded-full ${bgColorStandard} flex items-center justify-center`}
              >
                <IoListSharp className=" h-4 w-4 text-white" />
              </div>
            )}

            <span
              className={`${isActive ? "font-medium text-white" : "text-black"} text-sm`}
            >
              {listTitle}
            </span>
          </div>
          <span
            className={`${isActive ? "font-medium text-blue-200" : "text-gray-400"} text-sm`}
          >
            {totalReminders}
          </span>
        </>
      )}
    </NavLink>
  );
};
