import {Outlet} from "react-router";
import styles from "./MainLayout.module.scss";
import Header from "../Header/Header.jsx";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className={styles.main__container}>
                <Outlet/>
            </main>
        </>
    )
}

export default MainLayout