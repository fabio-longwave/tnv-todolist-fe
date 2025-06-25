import {TabPanel, Tabs} from "../../Tabs/Tabs.jsx";
import ActivityList from "../ActivityList/ActivityList.jsx";
import {useCallback, useContext, useEffect, useState} from "react";
import Loader from "../../Loader/Loader.component.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../reducers/user.slice.js";
import {activitySelector, setActivities, addActivity, clearActivities} from "../../../reducers/activity.slice.js";
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
    const [lazyState, setLazyState] = useState({
        skip:0,
        limit:5,
        status: [config.status.OPEN.value]
    })
    const [noMoreActivities, setNoMoreActivities] = useState(false);

    const retrieveActivities = async () => {
        setIsLoading(true);
        const data = await getActivities(lazyState).catch(e => {
            if(e.status === 404) {
                setNoMoreActivities(true);
            }
            console.error(e);
        });
        if (data) {
            setNoMoreActivities(false);
            if(lazyState.skip === 0){
                dispatch(setActivities(data.activities))
            } else {
                dispatch(setActivities([...activities, ...data.activities]))
            }
        }
        setIsLoading(false);
    }


    useEffect(() => {
        if (socketReady && socket) {
            retrieveActivities().catch(e => e)
        }
    }, [socketReady, socket, lazyState]);


    const handleStatusChange = (props) => {
        dispatch(clearActivities())
        setLazyState({...lazyState, skip:0, status: [props.status]})
    }

    const handleLoadMoreActivities = () => {
        setLazyState({...lazyState, skip: lazyState.skip + lazyState.limit})
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
                        <ActivityList activities={activities} onLoadMore={handleLoadMoreActivities} hideButton={noMoreActivities}></ActivityList> :
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
