import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getActivity} from "../../../services/activity.service.js";
import {useSelector} from "react-redux";
import {userSelector} from "../../../reducers/user.slice.js";
import {format} from "date-fns";
import styles from "./ActivityDetailPage.module.scss";
import {useTranslation} from "react-i18next";

const ActivityDetailPage = () => {
    const {t, i18n} = useTranslation();
    const [activity, setActivity] = useState(null);
    const params = useParams();
    const user = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (params.id && user.accessToken) {
            setIsLoading(true);
            getActivity(params.id, user.accessToken).then(data => {
                        setActivity(data);
                        setIsLoading(false);
                }
            ).catch(e => console.error(e));
        }
    }, []);

    if(isLoading) return <div>Caricamento...</div>

    const StatusLabels = {
        open: 'Aperta',
        completed: 'Completata',
        archived: 'Archiviata'
    }

    return (
        <>
            {activity && <div className="card">
                <div className={styles.info__element}>
                    <label>{t('labels.dueDate')}</label>
                    <span>{format(new Date(activity.dueDate), 'dd/MM/yyyy')}</span>
                </div>
                <div className={styles.info__element}>
                    <label>Nome attivit&agrave;</label>
                    <span>{activity.name}</span>
                </div>
                <div className={styles.info__element}>
                    <label>Stato attivit&agrave;</label>
                    <span>{StatusLabels[activity.status]}</span>
                </div>
                <div className={styles.info__element}>
                    <label>Descrizione</label>
                    <span>{activity.description}</span>
                </div>
            </div>}
        </>
    )

};

export default ActivityDetailPage;