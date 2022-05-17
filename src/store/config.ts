import { createSlice } from "@reduxjs/toolkit";

export interface ConfigState {
    theme: string;
    colorTheme: string;
}

const initialState: ConfigState = {
    theme: 'light',
    colorTheme: "theme-1"
}

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers:{
        setTheme:(state, action) =>{
            state.theme = action.payload
        },
        setColorTheme:(state, action)=>{
            state.colorTheme = action.payload;
        }
    }
})

export const { setTheme, setColorTheme }  = configSlice.actions;

export default configSlice.reducer