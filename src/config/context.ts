import React from "react";

export const NAVBAR_HEIGHT = "4.5rem";

export const PRIMARY_THEME = {
  theme: "light",
  blue: "",
  white: "white",
  text: "",
  bgColorStart: "#fafbff",
  bgColorEnd: "#ffff",
  bgCards: "#ffffff",
  color: "black",

  colorSelect: "#212529",
  shadowSelect: "none",
  borderColor: "",
  bgCard4: 'white',
  map: {
    mapBorder: "#000000",
    hover: "black",
    click: "rgb(1, 119, 250)",
    background: "white",
    color: "black",
  },
  dropDownColorCode: 1,

  bgStripe: "rgb(255,255,255)",
  bgStartupCard: "#f8f8f8",
  bgBadge: "#E0E0E0",
  dataTable:{
    searchBorderClass: "light-search-data-table" ,
    color: "white",
    bodyClass:"shadow-small-3",
    searchBg:"#ffffff",
    headerBorder: 'light-data-table-header',
    inputClass:"bg-white",
    dashedBorder: "black",
    textColor: 'black'
  },
  togglerButton:{
    backgroundInactive:"white",
    backgroundActive: "",
    color: "black",
    border:"1px solid rgba(0,0,0,0.2)"
  },
  searchBg: "#f8f8f8",
  shadowCards:"0px 0px 10px rgba(193, 193, 193, 0.25)",
  shadowStripe:"0px 0px 10px rgba(193, 193, 193, 0.25)",
  buttonShadow:"0px 0px 20px rgba(1, 119, 250, 0.25)",
  showCaseStartUpBorder:"1px solid #DDDDDD;",
  shadowMapView: "0px 0px 20px rgba(1, 119, 250, 0.2)",
  dropDownBorder:"light-border-bottom",
  dropDown:{
    cancel: 'white',
    cancelBorder: 'black',
    cancelColor: "black",
    searchBackground: "",
    searchBorder: "black"
  },
  iconButtonBackground:"white",
  color2:"black",
  headingColor: "rgba(0,0,0, 0.7)",

  tooltip:{
    background: "white",
    text: "black",
    border: "#0177FA"
  },
  tooltipViewInsight:{
    background: "#C4C4C4",
    color: "black"
  },
  viewInsightColor: "rgba(0,0,0,0.5)"
};

export const DARK_THEME = {
  theme: 'dark',
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
  bgStripe: "#1F1E2C",
  bgStartupCard: "rgba(31, 30, 44, 1)",
  bgBadge: "#26283A",
  dataTable:{
    searchBorderClass:"dark-search-data-table",
    bodyClass:"",
    searchBg:'rgba(31, 30, 44, 1)',
    headerBorder: 'dark-data-table-header',
    inputClass:"",
    dashedBorder:"white",
    textColor: 'white'
  },
  togglerButton:{
    backgroundInactive:"rgba(31, 30, 44, 1)",
    backgroundActive: "",
    color: "white",
    border:"1px solid rgba(255,255,255,0.2)"
  },
  searchBg:"rgba(31, 30, 44, 1)",
  shadowCards:"0px 0px none",
  shadowStripe:"0px 0px 0px 1px #444261",
  buttonShadow:"0px 0px 20px rgba(1, 119, 250, 0.25)",
  showCaseStartUpBorder:"1px solid #444261",
  shadowMapView:" 0px 0px 20px rgba(1, 119, 250, 0.25)",
  dropDownBorder:" border-bottom-filter ",
  dropDown:{
    cancel:"#25283A",
    cancelBorder: "white",
    cancelColor: "white",
    searchBackground: "rgba(31, 30, 44, 1)",
    searchBorder: "#444261"
  },
  iconButtonBackground:"rgba(38, 40, 58, 1)",
  color2: 'white',
  bgCard: 'rgba(31, 30, 44, 1)',
  headingColor: "white",
  tooltip:{
    background: "black",
    text: "white",
    border: "#0177FA"
  },
  tooltipViewInsight:{
    background: "#93949D",
    color: "white"
  },
  viewInsightColor: "rgba(255,255,255,0.5)"
};

export const ThemeContext = React.createContext(PRIMARY_THEME);
