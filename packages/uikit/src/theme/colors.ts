import { Colors } from "./types";

export const baseColors = {
  failure: "#ED4B9E",
  primary: "#3297cc",
  primaryBright: "#2dc1c9",
  primaryDark: "#3964d0",
  secondary: "#5e619c",
  success: "#31D0AA",
  warning: "#FFB237",
};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#452a7a",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
};

export const themeColors: Colors = {
  ...baseColors,
  ...additionalColors,
  // secondary: "#5e619c",
  background: "#08060B",
  backgroundDisabled: "#3c3742",
  backgroundAlt: "#0c0e29",
  backgroundAlt2: "#121743",
  backgroundAlt3: "#08091b",
  cardBorder: "#08060B",
  contrast: "#FFFFFF",
  dropdown: "#1E1D20",
  dropdownDeep: "#100C18",
  invertedContrast: "#191326",
  input: "#1c2256",
  inputSecondary: "#262130",
  primaryDark: "#0098A1",
  tertiary: "#0f144e",
  text: "#F4EEFF",
  textDisabled: "#666171",
  textSubtle: "#8486a6",
  disabled: "#524B63",
  gradients: {
    bubblegum: "linear-gradient(to right,#1d3a6b 0%,#1b1f54 100%)",
    inverseBubblegum: "linear-gradient(to right,#1b1f54 0%,#1d3a6b 100%)",
    cardHeader: "linear-gradient(166.77deg,#131747 0%,#060718 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
    violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};

// keep compatibolity with multi theme
export const lightColors = themeColors;
export const darkColors = themeColors;
