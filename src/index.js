import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Home from './components/Home.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';

function App() {

    const URL_BACK = "http://localhost:5050";

    const [token, setToken] = React.useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home token={token} />} />
                <Route path="/login" element={<Login URL_BACK={URL_BACK} setToken={setToken} />} />
                <Route path="/sign-up" element={<SignUp URL_BACK={URL_BACK} />} />
                {/* <Route path="/entry" element={<Entry />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));