import axios from '../axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import requests from '../Requests';
import Header from './Header';
import Row from './Row';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies, setMovies } from '../features/movie/movieSlice';

function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const movies = 
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            if(movies!==undefined)
                dispatch(setMovies(movies));
            return request;
        }
        fetchData();
    }, [])

    const movie = useSelector(selectMovies);

    return (
        <Container>
            <Header />
            <Background>
                <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}/>
            </Background>
            <Title>
                <h1>{`${movie?.name}`}</h1>
            </Title>
            <PlayButtons>
                <button>Play</button>
                <button>Trailer</button>
            </PlayButtons>
            <SubTitle>
                <p>{`${movie?.first_air_date} | ${movie?.vote_average} | ${movie?.popularity} | ${movie?.vote_count}`}</p>
            </SubTitle>
            <Description>
                {`${movie?.overview}`}
            </Description>
            <Row title='NETFLIX ORIGINALS' fetchURL={requests.fetchNetflixOriginals}/>
            <Row title='Trending Now' fetchURL={requests.fetchTrending}/>
            <Row title='Top Rated' fetchURL={requests.fetchTopRated}/>
            <Row title='Action Movies' fetchURL={requests.fetchActionMovies}/>
            <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies}/>
            <Row title='Horror Movies' fetchURL={requests.fetchHorrorMovies}/>
            <Row title='Romance Movies' fetchURL={requests.fetchRomanceMovies}/>
            <Row title='Documentries' fetchURL={requests.fetchDocumentaries}/>
        </Container>
    )
}

export default Home

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
`
const Background = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const Title = styled.div`
    color: white;
    margin-left: 30px;
    margin-top: -20px;
`
const SubTitle = styled.div`
    margin-left: 30px;
    font-weight: bold;
    color: white;
    font-size: 15px;
`
const Description = styled.div`
    display: flex;
    max-width: 450px;
    margin-left: 30px;
    font-weight: bold;
    color: white;   
    font-size: 15px;

`
const PlayButtons = styled.div`
    button{
        margin-left: 30px;
        padding: 10px;
        width: 70px;
        border-radius: 5px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        border: 1px solid white;
        cursor: pointer;
    }
`