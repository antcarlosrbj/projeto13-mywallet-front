import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Home from './components/Home.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Entry from './components/Entry.js';

function App() {

    const URL_BACK = "http://localhost:5050";

    const [token, setToken] = React.useState("");
    const [name, setName] = React.useState("");

    const [entry, setEntry] = React.useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home name={name} setEntry={setEntry} setName={setName} token={token} URL_BACK={URL_BACK} />} />
                <Route path="/login" element={<Login URL_BACK={URL_BACK} setToken={setToken} />} />
                <Route path="/sign-up" element={<SignUp URL_BACK={URL_BACK} />} />
                <Route path="/entry" element={<Entry URL_BACK={URL_BACK} token={token} entry={entry} />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));