import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
// import Modal from 'react-modal';
import Calendar from "./Components/Calendar";
import {useRoutes} from "./routes";

// Modal.setAppElement('#root');

function App() {
    const routes = useRoutes(false)
    return (
        <Router>
            {routes}
        </Router>
    );
}

export default App;
