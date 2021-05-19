import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectMovies } from '../features/movie/movieSlice'
import { Link } from "react-router-dom";

function Movies() {

    const movies = useSelector(selectMovies);

    return (
        <Container>
            <h4>Recommended for You</h4>
            <Content>
                {
                    movies.map(movie=>
                    <Wrap key={movie.id}>
                        <Link to={`/detail/${movie.id}`}>
                            <img src={movie.cardImg}/>
                        </Link>
                    </Wrap>)
                }
            </Content>
        </Container>
    )
}

export default Movies
const Container = styled.div`
    margin-top: 20px;
`
const Content = styled.div`
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
        border-radius: 5px;
    }
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 200ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;

    &:hover{
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    }

`