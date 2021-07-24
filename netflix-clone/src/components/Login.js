import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { setSignIn } from '../features/user/userSlice';
import { auth } from '../firebase';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();

    const handleEmail = (event)=>{
        setEmail(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    const signin = (event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((userDetails)=>{
            let user = userDetails.user;
            dispatch(setSignIn({
                username: user.displayName,
                email: user.email,
            }))
            history.push('/home');
        })
        .catch((error)=>{
            alert(error.message);
        })
    }

    return (
        <Container>
            <Logo src='/images/logo.png'/>
            <Content>
                <h1>Sign In</h1>
                <InputForm>
                    <input value={email} onChange={handleEmail} type='text' placeholder='Email or phone number' />
                    <input value={password} onChange={handlePassword} type='password' placeholder='Password' />
                    <button onClick={signin}>Sign In</button>
                    <div>
                        <input type='checkbox' /><span>Remember me</span>
                    </div>
                    <p>
                        New to Netflix? <Link to='/signup'><strong>Sign up now.</strong></Link><br></br>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more. 
                    </p>
                </InputForm>
            </Content>
        </Container>
    )
}

export default Login

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    display: flex;

    &:before{
        height: 100vh;
        content: '';
        position: absolute;
        background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/images/login-background.jpg') center center / cover no-repeat fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }
`
const Logo = styled.img`
    max-width: 250px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: -18px;
    margin-left: -40px;
`
const Content = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    margin-top: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    height: 628px;
    width: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    h1 {
        color: white;
        font-size: 35px;
        margin-top: 60px;
        margin-left: 50px;
        margin-bottom: 10px;
    }
`
const InputForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    input{
        padding: 17px;
        margin-top: 20px;
        border: 1px solid #333;
        border-radius: 5px;
        font-size: 15px;
        background-color: #333;
        color: #8c8c8c;
        outline: none;
    }
    button {
        margin-top: 40px;
        padding: 17px;
        border: 1px solid red;
        border-radius: 5px;
        font-size: 15px;
        background-color: red;
        font-weight: bold;
        color: white;
        cursor: pointer;
    }
    div{
        span{
            color: #8c8c8c;
            margin-left: 3px;
        }
    }
    p{
        width: 350px;
        color: #8c8c8c;
        strong {
            color: white;
            text-decoration: none;
        }
        br {
            margin-bottom: 10px;
        }
    }
`