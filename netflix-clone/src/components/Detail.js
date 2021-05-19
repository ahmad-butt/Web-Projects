import React from 'react'
import styled from 'styled-components';

function Detail() {

    return (
        <Container>
            <Logo>
                <img src='/images/logo.png'/>
            </Logo>
        </Container>
    )
}

export default Detail

const Container = styled.main`
    display: flex;
`
const Logo = styled.div`
    width: 100%;
    height: 100%;
    object-fit: cover;
    img {
        max-width: 250px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-top: -18px;
    }
`