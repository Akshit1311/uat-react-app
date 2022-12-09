import {
  createTheme, ThemeProvider as MaterialUiThemeProvider
} from "@mui/material/styles";
import axios from "axios";
import React, { Suspense, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import useLocalStorage from 'use-local-storage';
import "./App.scss";
import axiosConfig from "./config/axiosConfig.json";
import { DARK_THEME, PRIMARY_THEME, ThemeContext } from "./config/context";
import AppNavigator from "./routes/AppNavigator";
import './scss/componentStyles.scss';
import { store } from "./store/store";
import { ThemeButton } from "./styles-components/Button";

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
    <div data-theme={themeName} style={{ height: "100vh" }}>
      <ReduxProvider store={store}>
        <MaterialUiThemeProvider theme={myTheme}>
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={theme}>
            <Suspense fallback={()=>{
              return 'loading...'
            }}>
              <BrowserRouter>
                <AppNavigator />
              </BrowserRouter>
              <ThemeButton bottom={'100px'} onClick={themeHandler}>
                <MdDarkMode style={{ marginBottom: "4px", marginLeft: "3px"}} />
              </ThemeButton>
              </Suspense>
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
