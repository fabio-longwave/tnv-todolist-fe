import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: '',
    displayName: '',
    accessToken: '',
    refreshToken: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: () => initialState
    }
});

export const {setUser, clearUser} = userSlice.actions;

export const userSelector = (state) => state.user

