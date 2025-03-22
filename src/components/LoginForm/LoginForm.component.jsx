import styles from './LoginForm.module.scss';
import {useState} from "react";

const LoginFormComponent = () => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    const [formIsInvalid, setFormIsInvalid] = useState({
        email: false,
        password: false,
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value)

        setFormValue((prevState) => (
            {...prevState, [name]: value}
        ));
    }



    const submitForm = (event) => {
        setFormIsInvalid({
            email: false,
            password: false,
        })
        event.preventDefault();

        // TODO API CALL
        if(!formValue.email.includes("@")){
            setFormIsInvalid(prevState => ({...prevState, email: true}));
        }
        if(formValue.password.length < 8){
            setFormIsInvalid(prevState => ({...prevState, password: true}));
        }
    }

    return (
        <form className={styles.form} onSubmit={submitForm} >
            <div className={styles.form_field}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={formValue.email} onChange={handleChange} />
                {formIsInvalid.email && <p className={styles.error}>Digita un'email valida</p>}
            </div>
            <div className={styles.form_field}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formValue.password} onChange={handleChange} />
                {formIsInvalid.password && <p className={styles.error}>La password deve avere almeno 8 caratteri</p>}
            </div>

            <button type="submit" className={styles.submit_button}>Accedi</button>
        </form>
    )
}

export default LoginFormComponent