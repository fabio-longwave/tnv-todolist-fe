import config from "../../config.js";

export const getActivities = async (token) => {
    try {
        const response = await fetch(`${config.api.baseUrl}/${config.api.paths.activity}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error(error);
    }
}

export const createActivity = async (activity, token) => {
    try {
        const response = await fetch(`${config.api.baseUrl}/${config.api.paths.activity}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(activity)
        })

        const data = await response.json();
        if (response.ok) {
            return data
        }

    } catch (error) {
        console.error(error);
    }
}

export const editActivity = async (activity, activityId, token) => {
    try {
        const response = await fetch(`${config.api.baseUrl}/${config.api.paths.activity}/${activityId}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(activity)
        })

        const data = await response.json();
        if (response.ok) {
            return data
        }

    } catch (error) {
        console.error(error);
    }
}

export const changeActivityStatus = async (id, status, token) => {
    try {
        const response = await fetch(`${config.api.baseUrl}/${config.api.paths.activity}/${id}/${status}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })

        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error(error);
    }
}


export const deleteActivity = async (id, token) => {
    try {
        const response = await fetch(`${config.api.baseUrl}/${config.api.paths.activity}/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })

        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error(error);
    }
}