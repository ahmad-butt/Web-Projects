import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { selectUserName, selectUserPicture, setUserLogin, setUserSignOut } from '../features/user/userSlice';
import { auth, provider } from '../firebase';

function Header() {

    const userName = useSelector(selectUserName);
    const userPicture = useSelector(selectUserPicture);
    const dispatch = useDispatch();

    const history = useHistory();

    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .then((userDetails)=>{
            console.log(userDetails);
            let user = userDetails.user;
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                picture: user.photoURL,
            }));
            history.push('/logedin');
        })
    }

    const signOut = ()=>{
        auth.signOut()
        .then(()=>{
            dispatch(setUserSignOut());
            history.push('/');
        })
    }
   
    return (
        <Nav>
            <Logo src='/images/logo.svg'/>
                {
                    userName && userPicture ?
                    (
                        <>
                            <NavMenu>
                                <a>
                                    <img src='/images/home-icon.svg'/>
                                    <span>HOME</span>
                                </a>
                                <a>
                                    <img src='/images/search-icon.svg'/>
                                    <span>SEARCH</span>
                                </a>
                                <a>
                                    <img src='/images/watchlist-icon.svg'/>
                                    <span>WATCHLIST</span>
                                </a>
                                <a>
                                    <img src='/images/original-icon.svg'/>
                                    <span>ORIGINALS</span>
                                </a>
                                <a>
                                    <img src='/images/movie-icon.svg'/>
                                    <span>MOVIES</span>
                                </a>
                                <a>
                                    <img src='/images/series-icon.svg'/>
                                    <span>SERIES</span>
                                </a>
                            </NavMenu>
                            <UserImage onClick={signOut} src={userPicture}/>
                        </>
                    ) : (
                        <>
                        <p></p>
                        <button onClick={signIn}>LOGIN</button>
                        </>
                    )
                }
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    background-color: #090b13;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;

    p{
        flex: 1;
    }

    button{
        color: white;
        background: rgba(0,0,0,0);
        border: 1px solid white;
        border-radius: 4px;
        padding: 15px;
        cursor: pointer;
        margin-right: 0;
    }

    button:hover{
        background-color: white;
        color: black;
        transition: all 350ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    }
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;

        img{
            height: 20px;
        }
        
        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
            }
        }

        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
    flex: 1;
    cursor: pointer;
`

const UserImage = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`