import React from "react";

export const NAVBAR_HEIGHT = "4.5rem";

export const PRIMARY_THEME = {
  blue: "",
  white: "",
  text: "",
  bgColorStart: "#fafbff",
  bgColorEnd: "#ffff",
  bgCards: "#ffffff",
  color: "black",

  colorSelect: "#212529",
  shadowSelect: "none",
  borderColor: "",
  map: {
    mapBorder: "#000000",
    hover: "black",
    click: "rgb(1, 119, 250)",
    background: "white",
    color: "black",
  },
  dropDownColorCode: 1,

  bgStripe: "#f1f1f1"
};

export const DARK_THEME = {
  color: "white",
  bgColorStart: "rgba(31, 30, 44, 1)",
  bgColorEnd: "rgba(31, 30, 44, 1)",
  bgCards: "rgba(37, 40, 58, 1)",
  colorCards: "white",
  colorSelect: "#ffffff",
  shadowSelect: "0px 0px 20px rgba(1, 119, 250, 0.25)",
  borderColor: "",
  map: {
    mapBorder: "white",

    hover: "#0177FA",
    click: "rgb(1, 119, 250)",
    background: "rgba(31, 30, 44, 1)",
    color: "white",
  },
  dropDownColorCode: 0,
  bgStripe: "#1F1E2C"
};

export const ThemeContext = React.createContext(PRIMARY_THEME);
