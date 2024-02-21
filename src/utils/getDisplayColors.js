import { listColors } from "@assets/listColors";

export const getDisplayColors = (listColor) => {
  if (listColor === "black") {
    return { bgColorStandard: "bg-black", textColorStandard: "text-black" };
  }
  const color = listColors.find((color) => color.name === listColor);
  return {
    bgColorLight: color.bgColors.light,
    bgColorStandard: color.bgColors.standard,
    textColorLight: color.textColors.light,
    textColorStandard: color.textColors.standard,
    checkedBgColor: color.checked.bgChecked,
    checkedOutlineColor: color.checked.outlineChecked,
  };
};
