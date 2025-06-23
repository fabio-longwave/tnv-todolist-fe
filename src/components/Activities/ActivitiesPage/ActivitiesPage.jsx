import {TabPanel, Tabs} from "../../Tabs/Tabs.jsx";
import ActivityList from "../ActivityList/ActivityList.jsx";
import {useCallback, useContext, useEffect, useState} from "react";
import Loader from "../../Loader/Loader.component.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../reducers/user.slice.js";
import {activitySelector, setActivities, addActivity} from "../../../reducers/activity.slice.js";
import AddEditActivity from "../AddEditActivity/AddEditActivity.jsx";
import Modal from "../../Modal/Modal.jsx";
import {createPortal} from "react-dom";
import ActivityShareModal from "../ActivityShareModal/ActivityShareModal.jsx";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import {SocketContext} from "../../../contexts/SocketProvider.jsx";
import config from "../../../../config.js";

const ActivitiesPage = () => {
    const activities = useSelector(activitySelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const {socket, socketReady} = useContext(SocketContext)
    const [isLoading, setIsLoading] = useState(false);
    const [addActivityOpen, setAddActivityOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([])
    const {getActivities, createActivity} = useSocketEmit();

    const retrieveActivities = async (status) => {
        setIsLoading(true);
        const payload = {
            skip: 0,
            limit: 100,
            status: status,
        }
        const data = await getActivities(payload).catch(e => {
            //alert('Errore nel recupero delle attivit&agrave;');
            if(e.status === 404) {
                dispatch(setActivities([]))
            }
            console.error(e);
        });
        if (data) {
            dispatch(setActivities(data.activities))
        }
        setIsLoading(false);
    }


    useEffect(() => {
        if (socketReady && socket) {
            retrieveActivities([config.status.OPEN.value]).catch(e => e)
        }
    }, [socketReady, socket]);

    const handleStatusChange = async (props) => {
        console.log(props)
        await retrieveActivities([props.status]);
    }

    const handleCreateActivity = async (activity) => {
        if (selectedUsers.length > 0) {
            activity.users = selectedUsers;
        }

        const data = await createActivity(activity).catch(e => {
            alert('Errore nel salvataggio dell\'attivit&agrave;');
            console.error(e);
        });


        if (data) {
            await dispatch(addActivity(data));
            setAddActivityOpen(false);
        }
    }

    const AddActivityModal = <Modal isOpen={addActivityOpen} onClose={() => setAddActivityOpen(false)}
                                    header="Aggiungi Attività">
        <AddEditActivity onSubmit={handleCreateActivity}/>
        <div className="modal__buttons">
            <button type="submit" form="add-edit-activity" className="button">Salva attivit&agrave;</button>
        </div>
    </Modal>


    return <>
        <div style={{marginBottom: 20}}>
            <button type="button" className="button" onClick={() => setAddActivityOpen(true)}>Aggiungi elemento</button>
        </div>
        <Tabs onTabChange={handleStatusChange}>
            {Object.values(config.status).map((s) => {
                return <TabPanel header={s.label} key={s.value} status={s.value}>
                    {!isLoading ?
                        <ActivityList activities={activities}></ActivityList> :
                        <Loader/>
                    }
                </TabPanel>
            })}
        </Tabs>
        {createPortal(AddActivityModal, document.body)}
        {createPortal(<ActivityShareModal selectedUsers={selectedUsers} onConfirm={() => null}/>, document.body)}
    </>
}

export default ActivitiesPage
