import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import LoggedInUserProvider from "./context/LoggedInUserProvider";
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <LoggedInUserProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </LoggedInUserProvider>
);