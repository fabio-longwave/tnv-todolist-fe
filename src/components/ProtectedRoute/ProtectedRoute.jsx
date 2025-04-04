import {Outlet, useNavigate} from "react-router";
import {useEffect, useState} from "react";

const ProtectedRoute = () => {
    const USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const navigate = useNavigate();
    const [user, setUser] = useState(USER);

    useEffect(() => {
        if (!user.accessToken) {
            navigate("/");
        }

    }, []);

    return <Outlet />
}

export default ProtectedRoute;