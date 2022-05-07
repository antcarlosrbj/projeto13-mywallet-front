import React from "react";
import styled from 'styled-components';

export default function Home() {
    return (
        <HomeStyle>
            <h1>MyWallet</h1>
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
    justify-content: center;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: white;
    }
`;
