import {combineReducers} from "@reduxjs/toolkit";
import {userSlice} from "./user.slice.js";
import {activitySlice} from "./activity.slice.js";

export const reducers = combineReducers({
    user: userSlice.reducer,
    activity: activitySlice.reducer
})