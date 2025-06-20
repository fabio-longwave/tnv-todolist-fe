import {TabPanel, Tabs} from "../../Tabs/Tabs.jsx";
import ActivityList from "../ActivityList/ActivityList.jsx";
import {useCallback, useEffect, useState} from "react";
import {createActivity, getActivities} from "../../../services/activity.service.js";
import Loader from "../../Loader/Loader.component.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../reducers/user.slice.js";
import {activitySelector, setActivities, addActivity} from "../../../reducers/activity.slice.js";
import AddEditActivity from "../AddEditActivity/AddEditActivity.jsx";
import Modal from "../../Modal/Modal.jsx";
import {createPortal} from "react-dom";
import ActivityShareModal from "../ActivityShareModal/ActivityShareModal.jsx";

const ActivitiesPage = () => {
    const activities = useSelector(activitySelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [addActivityOpen, setAddActivityOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([])
    const status = [
        {
            label: 'Aperte',
            value: 'open'
        },
        {
            label: 'Completate',
            value: 'completed'
        },
        {
            label: 'Archiviate',
            value: 'archived'
        }
    ]

    const filterActivitiesByStatus = (status) => {
        return activities.filter(activity => activity.status === status)
    }

    const retrieveActivities = useCallback(async () => {
        setIsLoading(true);
        if (user.accessToken) {
            const data = await getActivities(user.accessToken).catch(e => {
                alert('Errore nel recupero delle attivit&agrave;');
                console.error(e);
            });
            if (data) {
                dispatch(setActivities(data))
            }
        } else {
            console.error('No access token');
        }
        setIsLoading(false);
    }, [])


    useEffect(() => {
        retrieveActivities().catch(e => e)
    }, []);

    const handleCreateActivity = async (activity) => {
        if(selectedUsers.length > 0) {
            activity.users = selectedUsers;
        }
        const data = await createActivity(activity, user.accessToken).catch(e => {
            alert('Errore nel salvataggio dell\'attivit&agrave;');
            console.error(e);
        });

        if (data) {
            dispatch(addActivity(data));
            setAddActivityOpen(false);
        }
    }

    const AddActivityModal = <Modal isOpen={addActivityOpen} onClose={() => setAddActivityOpen(false)}
                                    header="Aggiungi Attività">
        <AddEditActivity onSubmit={handleCreateActivity}/>
        <div className="modal__buttons">
            <button type="submit" form="  -edit-activity" className="button">Salva attivit&agrave;</button>
        </div>
    </Modal>



    return <>
        <div style={{marginBottom: 20}}>
            <button type="button" className="button" onClick={() => setAddActivityOpen(true)}>Aggiungi elemento</button>
        </div>
        <Tabs>
            {status.map((s) => {
                return <TabPanel header={s.label} key={s.value}>
                    {!isLoading ?
                        <ActivityList activities={filterActivitiesByStatus(s.value)}></ActivityList> :
                        <Loader/>
                    }
                </TabPanel>
            })}
        </Tabs>
        {createPortal(AddActivityModal, document.body)}
        {createPortal(<ActivityShareModal selectedUsers={selectedUsers} onConfirm={() => null} />, document.body)}
    </>
}

export default ActivitiesPage
