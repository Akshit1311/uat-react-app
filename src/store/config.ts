import { createSlice } from "@reduxjs/toolkit";

export interface ConfigState {
    theme: string
}

const initialState: ConfigState = {
    theme: 'light'
}

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers:{
        setTheme:(state, action) =>{
            state.theme = action.payload
        }
    }
})

export const { setTheme }  = configSlice.actions;

export default configSlice.reducer