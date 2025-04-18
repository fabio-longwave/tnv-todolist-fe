import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activities: []
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setActivities: (state, action) => {
            state.activities = action.payload;
        },
        updateStatus: (state, action) => {
            state.activities = state.activities.map(activity => {
                if (activity["_id"] === action.payload["_id"]) {
                    return action.payload
                }
                return activity;
            });
        },
        removeActivity: (state, action) => {
            state.activities = state.activities.filter(activity => activity["_id"] !== action.payload);
        },
        clearActivities: () => initialState
    }
});

export const {setActivities, updateStatus, removeActivity, clearActivities} = activitySlice.actions;

export const activitySelector = (state) => state.activity.activities
