import {Outlet} from "react-router";
import styles from "./AuthLayout.module.scss";
const AuthLayout = () => {
    return (
        <main className={styles.auth__container}>
            <Outlet />
        </main>
    )
}

export default AuthLayout