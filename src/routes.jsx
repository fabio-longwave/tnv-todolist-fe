import App from "./App.jsx";
import LoginFormComponent from "./components/LoginForm/LoginForm.component.jsx";
import RegistrationFormComponent from "./components/RegistrationForm/RegistrationForm.component.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ActivityList from "./components/Activities/ActivityList/ActivityList.jsx";
import AuthLayout from "./components/AuthLayout/AuthLayout.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import ActivitiesPage from "./components/Activities/ActivitiesPage/ActivitiesPage.jsx";
import ActivityDetailPage from "./components/Activities/ActivityDetailPage/ActivityDetailPage.jsx";

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
                                path: 'activities',
                                element: <ActivitiesPage/>,
                            },
                            {
                                path: 'activity/:id',
                                element: <ActivityDetailPage/>,
                            }
                        ]
                    }
                ]
            }
        ]
    },
]