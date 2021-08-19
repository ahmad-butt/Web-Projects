import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {
  const completeDetails = useRef(props?.movieDetail);
  const history = useHistory();
  if(props?.movieDetail===undefined) {
    history.push('/home')
  }
  return (
    <Container>
      <Logo>
        <img src="/images/logo.png" />
      </Logo>
      <Background>
        <img
          src={`https://image.tmdb.org/t/p/original/${props?.movieDetail?.backdrop_path}`}
        />
      </Background>
      <Title>
        <h1>{props?.movieDetail?.name ? `${props?.movieDetail?.name}` : `${props?.movieDetail?.original_title}`}</h1>
      </Title>
      <PlayButtons>
        <button onClick={() => console.log(completeDetails.current)}>
          Play
        </button>
        <button>Trailer</button>
      </PlayButtons>
      <SubTitle>
        <p>{`${props?.movieDetail?.first_air_date} | ${props?.movieDetail?.vote_average} | ${props?.movieDetail?.popularity} | ${props?.movieDetail?.vote_count}`}</p>
      </SubTitle>
      <Description>{`${props?.movieDetail?.overview}`}</Description>
    </Container>
  );
}

export default Detail;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
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
`;
const Title = styled.div`
  color: white;
  margin-left: 30px;
  margin-top: -20px;
`;
const PlayButtons = styled.div`
  button {
    margin-left: 30px;
    padding: 10px;
    width: 70px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: 1px solid white;
    cursor: pointer;
  }
`;
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
