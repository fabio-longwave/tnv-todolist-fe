import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router";
import {routes} from './routes.jsx';
import App from "./App.jsx";
import LoginFormComponent from "./components/LoginForm/LoginForm.component.jsx";
import {ThemeProvider} from "./contexts/ThemeProvider.jsx";
import {Provider} from "react-redux";
import {store, persistor} from "./store/store.js";
import {PersistGate} from "redux-persist/integration/react";
import './i18n/i18n.js';

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                <RouterProvider router={router} />
              </PersistGate>
          </Provider>
      </ThemeProvider>
  </StrictMode>,
)
