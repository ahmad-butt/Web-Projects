import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import "./Login.css";
import { setUserInfo } from "../features/user/userSlice";
import logo from '../whatsapp.png'

function Login() {
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        dispatch(
          setUserInfo({
            user: user.emailVerified,
            username: user.displayName,
            email: user.email,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
