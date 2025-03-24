import './App.scss'
import LoginFormComponent from "./components/LoginForm/LoginForm.component.jsx";
import {useState} from "react";
import RegistrationFormComponent from "./components/RegistrationForm/RegistrationForm.component.jsx";

function App() {
    const [showSignup, setShowSignup] = useState(false);
  return (
    <main className="main_content">
        {!showSignup && <div className="card">
            <LoginFormComponent />
            <div>oppure</div>
            <div>
                <button onClick={() => setShowSignup(true)}> Registrati </button>
            </div>
        </div> }
        {showSignup && <div className="card">
            <RegistrationFormComponent />
            <div>oppure</div>
            <div>
                <button onClick={() => setShowSignup(false)}> Torna al Login </button>
            </div>
        </div>
        }
    </main>
  )
}

export default App
