import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { selectMovies } from '../features/movie/movieSlice'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import db from '../firebase';

function Details() {

    const movies = useSelector(selectMovies);
    
    const [movie, setMovie] = useState({});

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        db.collection('movies')
        .doc(id)
        .get()
        .then(doc=>{
            if(doc.exists){
                setMovie(doc.data());
            }
        }).catch(error=>{
            alert(error.message);
        })
    }, [])

    console.log(movie);

    return (
        <Container>
            {
                movies && (
                    <>
                        <Background>
                            <img src={movie.backgroundImg}/>
                        </Background>
                        <ImageTitle>
                            <img src={movie.titleImg}/>
                        </ImageTitle>
                        <Controls>
                            <PlayButton>
                                <img src='/images/play-icon-black.png'/>
                                <span>PLAY</span>
                            </PlayButton>
                            <TrailerButton>
                                <img src='/images/play-icon-white.png'/>
                                <span>TRAILER</span>
                            </TrailerButton>
                            <AddButton>
                                <span>+</span>
                            </AddButton>
                            <GroupButton>
                                <img src='/images/group-icon.png'/>
                            </GroupButton>
                        </Controls>
                        <Subtitle>
                            {movie.subTitle}
                        </Subtitle>
                        <Description>
                            {movie.description}
                        </Description>
                    </>
                )
            }
        </Container>
    )
}

export default Details

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding = 0 calc(3.5vw + 5px);
    position: relative;
    margin-left: 50px;
`
const Background = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const ImageTitle = styled.div`
    width: 400px;
    min-height: 170px;
    min-width: 200px;
    margin-bottom: 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const Controls = styled.div`
    display: flex;
    margin-left: 10px;
`
const PlayButton = styled.button`
    border-radius: 4px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        transition: all 150ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    }
`
const TrailerButton = styled.button`
    border: 1px solid white;
    border-radius: 4px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    color: white;
    margin-left: 15px;
    cursor: pointer;
    background: rgba(0,0,0,0.3);
    
    &:hover {
        transform: scale(1.05);
        transition: all 150ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    }
`
const AddButton = styled.button`
    color: white;
    margin-left: 15px; 
    background: rgba(0,0,0,0.6);
    border: 1px solid white;
    border-radius: 50px;
    cursor: pointer;
    width: 56px;
    height: 56px;

    span{ 
        font-size: 30px;
    }

    &:hover {
        transform: scale(1.05);
        transition: all 150ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    }
`
const GroupButton = styled.button`
    margin-left: 15px;
    background: rgba(0,0,0,0.6);
    border: 1px solid white;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        transition: all 200ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    }
`
const Subtitle = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    color: rgb(249,249,249);
    font-size: 15px;
`
const Description = styled.div`
    line-height: 1.4;
    font-size: 18px;
    color: rgb(249,249,249);
    max-width: 700px;
`