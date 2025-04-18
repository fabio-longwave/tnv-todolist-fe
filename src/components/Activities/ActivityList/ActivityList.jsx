import ActivityItem from "../ActivityItem/ActivityItem.jsx";

const ActivityList = ({activities}) => {
    return (
        <>
            {activities.length > 0 ?
                activities?.map(activity => (
                    <ActivityItem key={activity['_id']} activity={activity}/>
                )) : <div>Nessun Elemento in lista</div>}
        </>
    )
}

export default ActivityList;