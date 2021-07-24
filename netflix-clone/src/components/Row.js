import axios from '../axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './Row.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Row(props) {

    const [movies, setMovie] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(props.fetchURL);
            setMovie(request.data.results);
            return request;
        }
        fetchData();
    },[props.fetchURL]);

    return (
        <Container>
            <h3>{props.title}</h3>
            <Wrap className='temp'>
                <div>
                    {
                        movies.map(movie => (
                            <Link key={movie?.id} to={`/detail/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}/></Link>
                        ))
                    }
                </div>
            </Wrap>
        </Container>
    )
}

export default Row

const Container = styled.main`
    color: white;
    margin-left: 30px;
    margin-right: 30px;
`
const Wrap = styled.div`
    div{
        display: flex;
        overflow-y: hidden;
        overflow-x: scroll;
        padding: 20px;
    }
    img{
        max-height: 150px;
        object-fit: contain;
        margin-right: 10px;
        transition: transform 400ms;
        border-radius: 5px;
        &:hover{
            transform: scale(1.08);
            opacity: 1;
            cursor: pointer;
        }
    }
`