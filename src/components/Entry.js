import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";



export default function Entry({ URL_BACK, token, entry }) {

    const [value, setValue] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [erro, setErro] = React.useState(<p></p>);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    });

    function entryForm(event) {
        event.preventDefault();

        const promisse = axios.post(URL_BACK + "/account", {
            entry: entry,
            value: Number(value),
            description: description
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        promisse.then(res => {
            navigate("/");
        });

        promisse.catch(error => {
            if(error.response.status === 400) {
                setErro(<p>Preencha todos os campos corretamente</p>);
            } else if (error.response.status === 401) {
                navigate("/");
            } else {
                alert("Infelizmente, não foi possível salvar a transação. Tente novamente mais tarde.");
            }
            console.log(error);
        });

    }

    return (
        <LoginStyle>
            <Header>
                <h1>Nova {entry === "credit" ? "Entrada" : "Saída"}</h1>
            </Header>
            <form onSubmit={entryForm}>
                <input type="number" value={value} placeholder="Valor" onChange={e => setValue(e.target.value)} required />
                <input type="text" value={description} placeholder="Descrição" onChange={e => setDescription(e.target.value)} required />
                <button type="submit">Salvar {entry === "credit" ? "Entrada" : "Saída"}</button>
            </form>
            {erro}
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
    justify-content: start;

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
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 84vw;
    height: 12vh;

    h1 {
        font-size: 26px;
        font-weight: bold;
        color: white;
    }
`;