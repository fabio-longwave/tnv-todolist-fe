import './App.scss'
import LoginFormComponent from "./components/LoginForm/LoginForm.component.jsx";
import {useEffect, useState} from "react";
import RegistrationFormComponent from "./components/RegistrationForm/RegistrationForm.component.jsx";
import MoviesList from "./components/MoviesList/MoviesList.jsx";

const USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

function App() {
    const [componentName, setComponentName] = useState('login');
    const [user, setUser] = useState(USER);

    useEffect(() => {
        if (user.accessToken) {
            setComponentName('todoList')
        } else {
            setComponentName('login');
        }
    }, [user]);


    return (
        <main className="main_content">
            {componentName === 'login' && <div className="card">
                <LoginFormComponent onLogin={setUser}/>
                <div>oppure</div>
                <div>
                    <button onClick={() => setComponentName('signUp')}> Registrati</button>
                </div>
            </div>}
            {componentName === 'signUp' && <div className="card">
                <RegistrationFormComponent/>
                <div>oppure</div>
                <div>
                    <button onClick={() => setComponentName('login')}> Torna al Login</button>
                </div>
            </div>
            }
            {componentName === 'todoList' && <div className="card">
                <MoviesList/>
            </div>
            }
        </main>
    )
}

export default App
