import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <>
            <div>In caricamento</div>
            <span className={styles.loader}></span>
        </>
    )


}

export default Loader;