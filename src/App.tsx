import React, { useState, useContext } from "react";
import AppNavigator from "./routes/AppNavigator";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import axiosConfig from "./config/axiosConfig.json";
import styled, { ThemeProvider } from "styled-components";
import { BiLoaderCircle } from "react-icons/bi";
import { PRIMARY_THEME, DARK_THEME, ThemeContext } from "./config/context";
import "./App.scss";
import {
  ThemeProvider as MaterialUiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import './scss/componentStyles.scss'
import { ThemeButton } from "./styles-components/Button"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store/store";
import { useSelector, useDispatch } from 'react-redux'
import { ConfigState } from "./store/config";
import useLocalStorage from 'use-local-storage'
import { MdDarkMode } from "react-icons/md";

axios.defaults.baseURL = axiosConfig.baseURL;

function App() {
  const [theme, setTheme] = useState<any>(PRIMARY_THEME);
  const [themeNumber, setThemeNumber] = useState<number>(1);
  // const [themeName, setThemeName] = useState('light');
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [themeName, setThemeName] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const themeHandler = () => {
    const currentThemeNumber = themeNumber;

    if (currentThemeNumber === 1) {
      setTheme(DARK_THEME);
      setThemeNumber(0);
      setThemeName('light')
      return;
    }

    if (currentThemeNumber === 0) {
      setTheme(PRIMARY_THEME);
      setThemeNumber(1);
      setThemeName('dark')
      return;
    }
  };
  const myTheme = createTheme({
    palette: {
      mode: themeNumber === 0 ? "dark" : "light",
    },
  });
  React.useEffect(() => {
    require("./scss/theme/lightTheme.scss");
  }, []);
  return (
    <div onScroll={(changeEvent) => console.log(changeEvent)} data-theme={themeName} style={{ height: "100vh" }}>
      <ReduxProvider store={store}>
        <MaterialUiThemeProvider theme={myTheme}>
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={theme}>
              <BrowserRouter>
                <AppNavigator />
              </BrowserRouter>
              <ThemeButton bottom={'100px'} onClick={themeHandler}>
                <MdDarkMode style={{ marginBottom: "4px", marginLeft: "3px"}} />
              </ThemeButton>
            </ThemeContext.Provider>
          </ThemeProvider>
        </MaterialUiThemeProvider>
      </ReduxProvider>
    </div>
  );
}

function Config() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
    <>
      <div data-theme={theme} style={{ height: "100vh" }}>
        <button onClick={switchTheme}>Switch</button>
        <div className="square">
          <h1>Hello</h1>
        </div>
      </div>
    </>
  )
}

export default App;
