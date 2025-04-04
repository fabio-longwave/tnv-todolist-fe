import {useEffect, useState} from "react";
import {signUp} from "../../services/registration.service.js";
import {hasMinLength, isEmail, isEqualToOtherValue, isNotEmpty} from "../../utils/validators.js";
import Input from "../Input/Input.component.jsx";
import useInput from "../../hooks/useInput.js";
import Logo from "../../assets/logo-tnv-academy.png"
import styles from "./RegistrationForm.module.scss";
import {Link, useNavigate} from "react-router";
import {FaArrowLeftLong} from "react-icons/fa6";

const RegistrationFormComponent = () => {
    const navigate = useNavigate();
    const {value: nameValue, handleChange: handleNameChange} = useInput("");
    const {value: emailValue, handleChange: handleEmailChange} = useInput("");
    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");
    const {value: confirmPasswordValue, handleChange: handleConfirmPasswordChange} = useInput("");

    const [formErrors, setFormErrors] = useState({
        displayName: "",
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        console.log(formErrors);
    }, []);


    const handleFormErrorsChange = (key, value) => {
        setFormErrors(prevState => ({...prevState, [key]: value}));
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setFormErrors({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
        const isNameValid = isNotEmpty(nameValue);
        const isEmailValid = isNotEmpty(emailValue) && isEmail(emailValue);
        const isPasswordValid = hasMinLength(passwordValue, 8);
        const passwordsMatch = isEqualToOtherValue(passwordValue, confirmPasswordValue);

        if (!isNameValid) {
            handleFormErrorsChange('displayName', 'Inserisci il nome');
        }

        if (!isNotEmpty(emailValue)) {
            handleFormErrorsChange('email', 'Inserire l\'indirizzo email');
        } else if (!isEmail(emailValue)) {
            handleFormErrorsChange('email', 'L\'indirizzo email deve contenere @');
        }

        if (!isPasswordValid) {
            handleFormErrorsChange('password', 'La password deve contenere almeno 8 caratteri');
        }

        if (!passwordsMatch) {
            handleFormErrorsChange('confirmPassword', 'Le password devono corrispondere');
        }

        if (!isNameValid || !isEmailValid || !isPasswordValid || !passwordsMatch) {
            return
        }

        const payload = {
            displayName: nameValue,
            email: emailValue,
            password: passwordValue,
        }

        const res = await signUp(payload);
        if(res) {
            navigate("/");
        }
    }

    return (
        <div className="card">
            <img src={Logo} className="logo" alt="logo"/>
            <h2>Registrati</h2>
            <form className="form" onSubmit={submitForm}>
                <Input id="displayName" label="Nome" error={formErrors.displayName} name="displayName"
                       value={nameValue} onChange={handleNameChange} type="text"/>
                <Input id="email" label="Email" error={formErrors.email} name="email" value={emailValue}
                       onChange={handleEmailChange} type="text"/>
                <Input id="password" label="Password" error={formErrors.password} name="password" value={passwordValue}
                       onChange={handlePasswordChange} type="password"/>
                <Input id="confirmPassword" label="Conferma password" error={formErrors.confirmPassword}
                       name="confirmPassword" value={confirmPasswordValue} onChange={handleConfirmPasswordChange}
                       type="password"/>
                <button type="submit" className="submit_button">Registrati</button>
            </form>
            <div className={styles.backToLogin}>
                <Link to={'/'}><FaArrowLeftLong /> Torna al Login</Link>
            </div>
        </div>
    )
}

export default RegistrationFormComponent