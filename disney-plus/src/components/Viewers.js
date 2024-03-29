import React from 'react'
import styled from 'styled-components'

function Viewers() {
    return (
        <Container>
            <Wrap>
                <img src='/images/viewers-disney.png'/>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-marvel.png'/>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-national.png'/>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-pixar.png'/>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-starwars.png'/>
            </Wrap>
        </Container>
    )
}

export default Viewers

const Container = styled.div`
    margin-top: 30px;
    padding: 30px 0 26px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(5, minmax(0,1fr));
`
const Wrap = styled.div`
    border: 2px solid rgba(248, 249, 249, 0.1);
    border-radius: 5px;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;

    &:hover {
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    }
`