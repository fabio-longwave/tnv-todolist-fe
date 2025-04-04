import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router";
import {routes} from './routes.jsx';
import App from "./App.jsx";
import LoginFormComponent from "./components/LoginForm/LoginForm.component.jsx";
import {ThemeProvider} from "./contexts/ThemeProvider.jsx";

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
          <RouterProvider router={router} />
      </ThemeProvider>
  </StrictMode>,
)
