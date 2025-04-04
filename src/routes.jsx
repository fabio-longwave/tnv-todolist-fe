import App from "./App.jsx";
import LoginFormComponent from "./components/LoginForm/LoginForm.component.jsx";
import RegistrationFormComponent from "./components/RegistrationForm/RegistrationForm.component.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import MoviesList from "./components/MoviesList/MoviesList.jsx";
import AuthLayout from "./components/AuthLayout/AuthLayout.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";

export const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                element: <AuthLayout/>,
                children: [
                    {
                        index: true,
                        element: <LoginFormComponent/>
                    },
                    {
                        path: 'register',
                        element: <RegistrationFormComponent/>
                    },
                ]
            },
            {
                element: <MainLayout/>,
                children: [
                    {
                        element: <ProtectedRoute/>,
                        children: [
                            {
                                path: 'movies',
                                element: <MoviesList/>,
                            }
                        ]
                    },
                    {
                        path: 'movies-not-auth',
                        element: <MoviesList/>,
                    }
                ]
            }
        ]
    },
]