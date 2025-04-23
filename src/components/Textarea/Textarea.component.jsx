import FormField from "../FormField/FormField.jsx";
import styles from "./Textarea.module.scss";

const Textarea = ({id, label, error, ...props }) => {
    return (
        <FormField id={id} label={label} error={error}>
            <textarea className={styles.input} id={id} {...props}/>
        </FormField>
    )
}

export default Textarea;