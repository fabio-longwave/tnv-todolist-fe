import {useState} from "react";
import {isEmail, hasMinLength, isNotEmpty} from "../../utils/validators.js";
import {login} from "../../services/login.service.js";
import FormField from "../FormField/FormField.jsx";
import Input from "../Input/Input.component.jsx";
import useInput from "../../hooks/useInput.js";

const LoginFormComponent = ({onLogin}) => {
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

        if(!isNotEmpty(emailValue)) {
            handleFormErrorsChange('email', 'Inserire l\'indirizzo email');
        } else if(!isEmail(emailValue)) {
            handleFormErrorsChange('email', 'L\'indirizzo email deve contenere @');
        }

        if(!hasMinLength(passwordValue, 8)) {
            handleFormErrorsChange('password', 'La password deve contenere almeno 8 caratteri');
        }

        if(formErrors.email.length > 0 || formErrors.password.length > 0 ){
            return;
        }

       const res = await login({email: emailValue, password: passwordValue});
        if(res) {
            localStorage.setItem('user', JSON.stringify(res));
            onLogin(res);
        }
    }

    return (
        <form className="form" onSubmit={submitForm} >
            <Input id="email" label="Email" error={formErrors.email} name="email"  onChange={handleEmailChange} type="text" value={emailValue}/>
            <Input id="password" label="Password"  error={formErrors.password} name="password" onChange={handlePasswordChange} type="password" value={passwordValue}/>
            <button type="submit" className="submit_button">Accedi</button>
        </form>
    )
}

export default LoginFormComponent