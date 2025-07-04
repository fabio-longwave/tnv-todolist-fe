import {useState} from "react";
import styles from "./Tabs.module.scss";

export const Tabs = ({children, onTabChange}) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabHeaders = [];
    const tabContent = [];

    const handleTabChange = (index, props) => {
        setActiveTab(index);
        onTabChange(props);
    }

    children.forEach((child, index) => {
        tabHeaders.push(
            <button key={index}
                    className={`${styles['tab-button']} ${activeTab === index ? styles.active : ""}`}
                    onClick={() => handleTabChange(index, child.props)}>
                {child.props.header}
            </button>
        )
        tabContent.push(child);
    });


    return <section className={styles['tabs-container']}>
        <div className={styles['tabs-header']}>{tabHeaders}</div>
        <div className={styles['tab-content']} >{tabContent[activeTab]}</div>
    </section>
}

export const TabPanel = ({header, children, ...props}) => {
    return <div>{children}</div>
}
