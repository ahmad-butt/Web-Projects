import { Button } from "@material-ui/core";
import React from "react";
import {auth, provider} from '../firebase'; 
import './Login.css'

function Login() {
    const signInWithGoogle = ()=>{
      auth.signInWithPopup(provider).then(result=>{
          console.log(result)
      }).catch((err)=>{
          alert(err.message);
      })
    }
  return (
    <div className="login">
      <div className="login__container">
        <img src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
