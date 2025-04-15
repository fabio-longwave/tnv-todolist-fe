import ActivityItem from "../ActivityItem/ActivityItem.jsx";

const ActivityList = ({activities}) => {
    return (
        <>
            {activities.length > 0 ?
                activities?.map(activity => (
                <div key={activity['_id']}>{activity.name}</div>
            )) : <div>Nessun Elemento in lista</div>}
            {/*<ActivityItem activity={activity} />*/}
        </>
    )
}

export default ActivityList;