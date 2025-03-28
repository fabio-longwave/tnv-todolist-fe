import styles from './LoginForm.module.scss';
import {useState} from "react";

const LoginFormComponent = () => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    const [formIsInvalid, setFormIsInvalid] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value)

        setFormValue((prevState) => (
            {...prevState, [name]: value}
        ));
    }


    const submitForm = (event) => {
        event.preventDefault();
        setFormIsInvalid({
            email: '',
            password: '',
        })

        // TODO API CALL
        if(!formValue.email || formValue.email.trim().length === 0) {
            setFormIsInvalid(prevState => ({...prevState, email: 'Inserire l\'indirizzo email'}));
        } else if(!formValue.email.includes("@")){
            setFormIsInvalid(prevState => ({...prevState, email: 'L\'indirizzo email deve contenere @'}));
        }
        if(formValue.password.length < 8){
            setFormIsInvalid(prevState => ({...prevState, password: 'La password deve contenere almeno 8 caratteri'}));
        }

        if(formIsInvalid.email.length > 0 || formValue.password.length > 0 ){
            return;
        }


    }

    return (
        <form className={styles.form} onSubmit={submitForm} >
            <div className={styles.form_field}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={formValue.email} onChange={handleChange} />
                {formIsInvalid.email?.length > 0 && <p className={styles.error}>{formIsInvalid.email}</p>}
            </div>
            <div className={styles.form_field}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formValue.password} onChange={handleChange} />
                {formIsInvalid.password?.length > 0 && <p className={styles.error}>{formIsInvalid.password}</p>}
            </div>

            <button type="submit" className={styles.submit_button}>Accedi</button>
        </form>
    )
}

export default LoginFormComponent