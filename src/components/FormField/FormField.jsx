import styles from './FormField.module.scss'
const FormField = ({id, label, error, children}) => {
    return (
        <div className={styles.form_field}>
            <label htmlFor={id}>{label}</label>
            {children}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}

export default FormField