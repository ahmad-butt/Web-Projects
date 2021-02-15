import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'
import './Login.css'
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [user, setUser] = useState(null);
    const history = useHistory();

    const login = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(
                console.log('Creating User'),
                history.push('/'),
            )
            .catch((error) => alert(error.message));
    }
    const signup = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(
                console.log('Signed up'),
                history.push('/'),
            )
            .catch(error => alert(error.message));
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__image' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png' />
            </Link>
            <form className='login__form'>
                <h1 className='form__h1'>Sign-in</h1>
                <strong className='form__strong'>E-mail</strong>
                <div>
                    <input className={'form__input'} value={email} onChange={(event) => setEmail(event.target.value)} type='text' />
                </div>
                <strong className='form__strong'>Password</strong>
                <div>
                    <input className={'form__input'} value={password} onChange={(event) => setPassword(event.target.value)} type='password' />
                </div>
                <button className='login__button1' onClick={login}>Sign-in</button>
                <p className='login__formCondition'>By continuing, you agree to Amazon's Conditions of Use and Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice. </p>
                <button className='login__button2' onClick={signup}>Create your Amazon Account</button>
            </form>
        </div>
    )
}

export default Login
