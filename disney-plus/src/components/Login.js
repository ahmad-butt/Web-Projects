import React from 'react'
import styled from 'styled-components'

function Login() {
    return (
        <Container>
            <Content>
                <Logo1 src='/images/cta-logo-one.svg'/>
                <CTAButton>GET ALL THERE</CTAButton>
                <Description>
                    Get Premier Access to Raya and the Last Dragon for an additional fee with Disney+ subscription. As of 03/26/21. the price of Disney+ and the Disney Bundle will increase by 1$.
                </Description>
                <Logo2 src='/images/cta-logo-two.png'/>
            </Content>
        </Container>
    )
}

export default Login

const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);   
    position: relative;
    dispay: flex;
    
    &:before {
        background: url('/images/login-background.jpg') center center / cover 
        no-repeat fixed;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`
const Content = styled.div`
    max-width: 650px;
    padding: 80px 40px;
    margin: auto;
`
const Logo1 = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 100px;
`
const CTAButton = styled.button`
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border 1px solid rgb(65,105,225);
    color: white;
    background-color: rgb(65,105,225);
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    cursor: pointer;
    
    &:active{
        background-color: blue;
    }
`
const Description = styled.div`
    font-size: 13.4px;
    margin-bottom: 20px;
    text-align: center;
`
const Logo2 = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`