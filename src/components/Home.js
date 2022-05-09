import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import dayjs from 'dayjs';

export default function Home({ name, setEntry, setName, token, URL_BACK }) {

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);

    const empty = <p>Não há registros de entrada ou saída</p>;

    useEffect(() => {
        if (token === "") {
            navigate("/login");
            return;
        }

        /* BUSCANDO NOME */

        const promisseName = axios.get(URL_BACK + "/login", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        promisseName.then(res => {
            setName(res.data.name);
        })
        promisseName.catch(erro => {
            console.log(erro);
        })

        /* BUSCANDO TRASAÇÕES */

        const promisse = axios.get(URL_BACK + "/account", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        promisse.then(res => {
            setTransactions(res.data);
        })
        promisse.catch(erro => {
            console.log(erro);
        })
    }, [])

    function balanceCalc(res) {
        let total = 0;
        transactions.forEach(transaction => {
            if (transaction.entry === "credit") {
                total += Number(transaction.value);
            } else {
                total -= Number(transaction.value);
            }
        });
        if (res === "value") {
            return Math.abs(total);
        } else {
            if (total >= 0) {
                return "credit";
            } else {
                return "debit";
            }
        }
    }

    function exit() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function goEntry(entry) {
        if(entry === "credit") {
            setEntry("credit");
        } else {
            setEntry("debit");
        }
        navigate("/entry");
    }

    return (
        <HomeStyle>
            <Header>
                <h1>Olá, {name}</h1>
                <ion-icon onClick={exit} name="exit-outline"></ion-icon>
            </Header>
            <Main>
                <Budget className={transactions.length ? "filled" : "empty"}>
                    {transactions.length ?
                        transactions.map((transaction, index) => {
                            return (
                                <div key={index}>
                                    <p className="date">{dayjs(transaction.date).format('DD/MM')}</p>
                                    <p className="description">{transaction.description}</p>
                                    <p className={
                                        transaction.entry === "credit" ? "credit" : "debit"
                                    }>{
                                            Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(transaction.value)
                                    }</p>
                                </div>
                            );
                        })
                    : empty}
                </Budget>
                <Balance>
                    {transactions.length ?
                        <>
                            <p className="text">SALDO</p>
                            <p className={balanceCalc("signal") + " value"}>{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(balanceCalc("value"))}</p>
                        </>
                    : <p></p>}
                </Balance>
            </Main>
            <Buttons>
                <div onClick={() => goEntry("credit")} className="credit">
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <div>
                        <p>Nova</p>
                        <p>Entrada</p>
                    </div>
                </div>
                <div onClick={() => goEntry("debit")} className="debit">
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <div>
                        <p>Nova</p>
                        <p>Saída</p>
                    </div>
                </div>
            </Buttons>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .empty {
        justify-content: center;
        font-size: 20px;
        color: #868686;
        text-align: center;
        padding: 18vw;
    }

    .filled {
        justify-content: start;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 84vw;
    height: 4.8vh;

    h1 {
        font-size: 26px;
        font-weight: bold;
        color: white;
    }

    ion-icon {
        font-size: 30px;
        color: white;
    }
`;

const Main = styled.div`
    width: 84vw;
    height: 67.2vh;
    border-radius: 5px;
    background-color: white;
`;

const Budget = styled.div`
    width: 84vw;
    height: calc(67.2vh - 40px);

    padding: 3.6vh 3.2vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;

    & > div {
        width: 77.6vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div > p {
        font-size: 16px;
        margin-bottom: 15px;
    }

    .date {
        color: #C6C6C6;
    }

    .description {
        width: 100%;
        padding: 0 6px;
    }

    .credit {
        color: green;
    }

    .debit {
        color: red;
    }
`;

const Balance = styled.div`
    width: 84vw;
    height: 40px;
    padding: 0 3.2vw;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .text {
        font-size: 17px;
        font-weight: 700;
    }

    .credit {
        color: green;
    }

    .debit {
        color: red;
    }
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 84vw;

    & > div {
        width: 40.8vw;
        height: 18vh;
        border-radius: 5px;
        background-color: #A328D6;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 1.5vh;

        color: white;
        text-decoration: none;
    }

    p {
        font-size: 17px;
        font-weight: 700;
    }

    ion-icon {
        font-size: 25px;
    }
`;