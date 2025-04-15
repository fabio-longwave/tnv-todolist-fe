import {TabPanel, Tabs} from "../../Tabs/Tabs.jsx";
import ActivityList from "../ActivityList/ActivityList.jsx";
import {useCallback, useEffect, useState} from "react";
import {getActivities} from "../../../services/activity.service.js";

const ActivitiesPage = () => {
    const USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const [user, setUser] = useState(USER);
    const [activities, setActivities] = useState([]);
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
        if(user.accessToken){
          const data = await getActivities(user.accessToken)
            if(data){
                setActivities(data)
            }
        }
    }, [])


    useEffect( () => {
       retrieveActivities().catch(e=> e)
    }, []);

    return <>
        <div style={{marginBottom: 20}}>
            <button type="button" className="button">Aggiungi elemento</button>
        </div>
        <Tabs>
            {status.map((s) => {
                return  <TabPanel header={s.label} key={s.value}>
                    <div>{s.label}</div>
                    <ActivityList activities={filterActivitiesByStatus(s.value)}></ActivityList>
                </TabPanel>
            })}
        </Tabs>
    </>
}

export default ActivitiesPage