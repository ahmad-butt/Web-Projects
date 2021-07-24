import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase';
import { useHistory } from 'react-router';
import { selectUsername, setSignOut } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
    
    const history = useHistory();

    const dispatch = useDispatch();

    const name = useSelector(selectUsername);

    const signout = ()=>{
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut());
            history.push('/');
        })
    }

    return (
        <Container>
            <Logo>
                <img src='/images/logo.png'/>
            </Logo>
            <Username>
                {name}
            </Username>
            <UserImage onClick={signout} src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' />
        </Container>
    )
}

export default Header

const Container = styled.main`
    display: flex;
    align-items: center;
    h1{ 
        color: white;
    }
`
const Logo = styled.div`
    // width: 100%;
    height: 100%;
    object-fit: cover;
    img {
        max-width: 250px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-top: -18px;
    }
    flex: 1;
`
const Username = styled.div`
    color: white;
    font-weight: bold;
    margin-right: 10px;
`
const UserImage = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 10%;
    cursor: pointer;
    margin-top: -20px;
`