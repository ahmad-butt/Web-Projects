import React from 'react'
import styled from 'styled-components'

function Movies() {
    return (
        <Container>
            <h4>Recommended for You</h4>
            <Content>
                <Wrap>
                    <img src='https://thenerdy.com/wp-content/uploads/2019/08/star-wars-the-mandalorian-promo-poster-1280-featured-01-470x310@2x.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://thenerdy.com/wp-content/uploads/2019/08/star-wars-the-mandalorian-promo-poster-1280-featured-01-470x310@2x.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://thenerdy.com/wp-content/uploads/2019/08/star-wars-the-mandalorian-promo-poster-1280-featured-01-470x310@2x.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://thenerdy.com/wp-content/uploads/2019/08/star-wars-the-mandalorian-promo-poster-1280-featured-01-470x310@2x.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://thenerdy.com/wp-content/uploads/2019/08/star-wars-the-mandalorian-promo-poster-1280-featured-01-470x310@2x.jpg'/>
                </Wrap>
            </Content>
            <h4>New to Disney+</h4>
            <Content>
                <Wrap>
                    <img src='https://cdn.flickeringmyth.com/wp-content/uploads/2020/10/disney-pixar-soul-poster-disney-plus-header.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn.flickeringmyth.com/wp-content/uploads/2020/10/disney-pixar-soul-poster-disney-plus-header.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn.flickeringmyth.com/wp-content/uploads/2020/10/disney-pixar-soul-poster-disney-plus-header.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn.flickeringmyth.com/wp-content/uploads/2020/10/disney-pixar-soul-poster-disney-plus-header.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn.flickeringmyth.com/wp-content/uploads/2020/10/disney-pixar-soul-poster-disney-plus-header.jpg'/>
                </Wrap>
            </Content>
            <h4>Originals</h4>
            <Content>
                <Wrap>
                    <img src='https://cdn57.androidauthority.net/wp-content/uploads/2019/11/the-lion-king-1200x675.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn57.androidauthority.net/wp-content/uploads/2019/11/the-lion-king-1200x675.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn57.androidauthority.net/wp-content/uploads/2019/11/the-lion-king-1200x675.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn57.androidauthority.net/wp-content/uploads/2019/11/the-lion-king-1200x675.jpg'/>
                </Wrap>
                <Wrap>
                    <img src='https://cdn57.androidauthority.net/wp-content/uploads/2019/11/the-lion-king-1200x675.jpg'/>
                </Wrap>
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