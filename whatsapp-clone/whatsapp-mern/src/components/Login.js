import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import "./Login.css";
import logo from '../whatsapp.png'

function Login() {
  const signInWithGoogle = (event) => {
      event.preventDefault();
      auth.signInWithPopup(provider).catch((err)=>{
        alert(err.message);
      })
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
