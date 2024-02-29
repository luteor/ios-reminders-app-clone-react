import { colors } from "@assets/colors";

export const getDisplayColors = (listColor) => {
  const color = colors[listColor];
  return {
    bgColorLight: color.bg.light,
    bgColorStandard: color.bg.standard,
    checkedBgColor: color.checked.bg,
    checkedOutlineColor: color.checked.outline,
    textColorLight: color.text.light,
    textColorStandard: color.text.standard,
  };
};
