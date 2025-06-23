const config = {
    api: {
        baseUrl: 'http://localhost:8000',
        paths: {
            activity: 'activity',
            user: 'user'
        },
    },
    actions: {
        complete: 'complete',
        uncomplete: 'uncomplete',
        archive: 'archive'
    },
    status: {
        OPEN: {
            label: 'Aperte',
            value: 'open'
        },

        COMPLETED: {
            label: 'Completate',
            value: 'completed'
        },
        ARCHIVED:  {
            label: 'Archiviate',
            value: 'archived'
        },
    },
    socket: {
        actions: {
            ADD_ACTIVITY: 'addActivity',
            ARCHIVE_ACTIVITY: 'archiveActivity',
            COMPLETE_ACTIVITY: 'completeActivity',
            REOPEN_ACTIVITY: 'reopenActivity',
            UPDATE_ACTIVITY: 'updateActivity',
            DELETE_ACTIVITY: 'deleteActivity',
            GET_ACTIVITY: 'getActivity',
            GET_ACTIVITIES_BY_SKIP: 'getActivitiesBySkip',
            GET_ACTIVITIES_BY_CURSOR: 'getActivitiesByCursor',
            GET_USERS: 'getUsers',
            DISCONNECT: 'disconnect',
            REMOVE_USER_FROM_SHARED_ACTIVITY: 'removeUserFromActivity',
        }
    }

}

export default config;
