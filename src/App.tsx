import React from "react";
import AppNavigator from "./routes/AppNavigator";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import axios from "axios"
import axiosConfig from "./config/axiosConfig.json"

axios.defaults.baseURL = axiosConfig.baseURL

function App() {
  return (
    <BrowserRouter>
      <AppNavigator />
    </BrowserRouter>
  );
}

export default App;
