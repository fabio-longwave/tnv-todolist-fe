import {useContext} from "react";
import {SocketContext} from "../contexts/SocketProvider.jsx";
import config from "../../config.js";

const useSocketEmit = () => {
    const { socket } = useContext(SocketContext);

    const getActivities = (payload) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.GET_ACTIVITIES_BY_SKIP, payload, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const createActivity = (activity) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.ADD_ACTIVITY, activity, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }
    return {
        getActivities,
        createActivity
    }
}

export default useSocketEmit;
