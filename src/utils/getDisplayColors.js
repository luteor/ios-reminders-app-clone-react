import { listColors } from "@assets/listColors";

export const getDisplayColors = (listColor) => {
  const color = listColors.find((color) => color.name === listColor);
  return {
    bgColorLight: color.bgColors.light,
    bgColorStandard: color.bgColors.standard,
  };
};
