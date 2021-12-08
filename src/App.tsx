import React, { useState, useContext } from "react";
import AppNavigator from "./routes/AppNavigator";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import axiosConfig from "./config/axiosConfig.json";
import styled, { ThemeProvider } from "styled-components";
import { BiLoaderCircle } from "react-icons/bi";
import { PRIMARY_THEME, DARK_THEME, ThemeContext } from "./config/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/componentStyles.scss";
import "./App.scss";

axios.defaults.baseURL = axiosConfig.baseURL;

const ThemeButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${(props) => props.theme.bgCards};
  color: ${(props) => props.theme.color};
`;

function App() {
  const [theme, setTheme] = useState<any>(PRIMARY_THEME);
  const [themeNumber, setThemeNumber] = useState<number>(1);
  const themeHandler = () => {
    const currentThemeNumber = themeNumber;

    if (currentThemeNumber === 1) {
      setTheme(DARK_THEME);
      setThemeNumber(0);
      require('./scss/theme/darkTheme.scss')
      return;
    }

    if (currentThemeNumber === 0) {
      setTheme(PRIMARY_THEME);
      setThemeNumber(1);
      require('./scss/theme/lightTheme.scss')
      return;
    }
  };
  React.useEffect(()=>{
    require('./scss/theme/lightTheme.scss')
  },[])
  return (
    <>
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <AppNavigator />
          </BrowserRouter>
          <ThemeButton onClick={themeHandler}>
            <BiLoaderCircle />
          </ThemeButton>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
