import { NavLink } from "react-router-dom";

import { getDisplayColors } from "@utils/colorUtils";

export const FavoriteList = ({
  listColor,
  listIcon,
  listTitle,
  listUrl,
  totalReminders,
}) => {
  const { bgColorStandard, textColorStandard } = getDisplayColors(listColor);
  return (
    <NavLink
      className={({ isActive }) =>
        `flex h-auto w-32 cursor-pointer flex-col justify-between gap-1 rounded-lg ${
          isActive ? bgColorStandard : "bg-stone-300"
        } p-2`
      }
      to={listUrl}
    >
      {({ isActive }) => (
        <>
          <div className="flex flex-row items-center justify-between">
            {listIcon && (
              <div
                className={`${isActive ? "bg-white " + textColorStandard : bgColorStandard + " text-white"} flex h-6 w-6 appearance-none items-center justify-center rounded-full`}
              >
                {listIcon}
              </div>
            )}

            <span
              className={`${isActive ? "text-white" : "text-gray-700"} text-xl font-bold`}
            >
              {totalReminders}
            </span>
          </div>

          <span
            className={`${isActive ? "text-white" : "text-gray-700"} text-sm font-semibold`}
          >
            {listTitle}
          </span>
        </>
      )}
    </NavLink>
  );
};
