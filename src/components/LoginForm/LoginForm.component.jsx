import {useContext, useState} from "react";
import {isEmail, hasMinLength, isNotEmpty} from "../../utils/validators.js";
import {login} from "../../services/login.service.js";
import Input from "../Input/Input.component.jsx";
import useInput from "../../hooks/useInput.js";
import Logo from "../../assets/logo-tnv-academy.png"
import styles from "./LoginForm.module.scss"
import {Link, useNavigate} from "react-router";
import {ThemeContext} from "../../contexts/ThemeProvider.jsx";

const LoginFormComponent = () => {
    const {theme, switchTheme} = useContext(ThemeContext)

    const navigate = useNavigate();
    const {value: emailValue, handleChange: handleEmailChange} = useInput("");
    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleFormErrorsChange = (key, value) => {
        setFormErrors(prevState => ({...prevState, [key]: value}));
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setFormErrors({
            email: '',
            password: '',
        })

        if (!isNotEmpty(emailValue)) {
            handleFormErrorsChange('email', 'Inserire l\'indirizzo email');
        } else if (!isEmail(emailValue)) {
            handleFormErrorsChange('email', 'L\'indirizzo email deve contenere @');
        }

        if (!hasMinLength(passwordValue, 8)) {
            handleFormErrorsChange('password', 'La password deve contenere almeno 8 caratteri');
        }

        if (formErrors.email.length > 0 || formErrors.password.length > 0) {
            return;
        }

        const user = await login({email: emailValue, password: passwordValue});
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/movies');
        }
    }

    return (
        <div className="card">
            <img src={Logo} className="logo" alt="logo"/>
            <h2>Accedi {theme}</h2>
            <form className="form" onSubmit={submitForm}>
                <Input id="email" label="Email" error={formErrors.email} name="email" onChange={handleEmailChange}
                       type="text" value={emailValue}/>
                <Input id="password" label="Password" error={formErrors.password} name="password"
                       onChange={handlePasswordChange} type="password" value={passwordValue}/>
                <div className={styles.registrationLink}>
                    <Link to={'/register'}>Registrati</Link>
                </div>
                <button type="submit" className="submit_button">Accedi</button>
            </form>
        </div>
    )
}

export default LoginFormComponent