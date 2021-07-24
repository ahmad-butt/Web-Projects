import React from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
const API_KEY = '99bbf21fef289c5ccf77cf5b831bbed8';

function Detail() {

    const {id} = useParams();

    console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)

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