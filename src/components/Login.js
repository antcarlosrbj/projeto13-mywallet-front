import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";



export default function Login({ URL_BACK, setToken }) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [erro, setErro] = React.useState(<p></p>); //Usuário e/ou senha incorretos

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            navigate("/");
        }
    });

    function loginForm(event) {
        event.preventDefault();

        const promisse = axios.post(URL_BACK + "/login", {
            email: email,
            password: password
        })

        promisse.then(res => {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        });

        promisse.catch(error => {
            setErro(<p>Usuário e/ou senha incorretos</p>);
            console.log(error);
        });

    }

    return (
        <LoginStyle>
            <h1>MyWallet</h1>
            <form onSubmit={loginForm}>
                <input type="email" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder="Senha" onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Entrar</button>
            </form>
            {erro}
            <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
        </LoginStyle>
    )
}

const LoginStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: white;
        margin-bottom: 24px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form > input {
        height: 58px;
        width: 326px;
        border-radius: 5px;
        border: 0;  
        padding: 15px;
        box-sizing: border-box;
        margin-bottom: 13px;
        font-size: 20px;
    }

    form > button {
        height: 46px;
        width: 326px;
        border-radius: 5px;
        border: 0;
        font-size: 20px;
        font-weight: 700;
        background-color: #A328D6;
        color: white;
    }

    p {
        margin-top: 4px;
        height: 16px;
        font-size: 15px;
        font-weight: 700;
        color: red;
    }

    a {
        font-size: 15px;
        font-weight: 700;
        color: white;
        text-decoration: none;
        margin-top: 16px;
    }
`;
