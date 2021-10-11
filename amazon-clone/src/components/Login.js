import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password).then(
        history.push("/")
      )
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="login">
      <div className="login__items">
        <Link to="/">
          <img
            className="login__itemsLogo"
            src="https://logos-download.com/wp-content/uploads/2016/03/Amazon_Logo_2000.png"
            alt="amazon"
          />
        </Link>
        <form>
          <div className="login__itemsForm">
            <h2 className="login__itemsFormHeading">Sign-In</h2>
            <div className="login__itemsFormInput">
              <p>Email or mobile phone number</p>
              <input value={email} onChange={handleEmail} type="text" />
              <p>Password</p>
              <input
                value={password}
                onChange={handlePassword}
                type="password"
              />
              <button onClick={handleLogin} className="login__itemsFormButton">Continue</button>
            </div>
            <div className="login__info">
              <p>
                By continuing, you agree to Amazon's{" "}
                <span>Conditions of Use</span> and <span>Privacy Notice</span>.
              </p>
              <p className="login__needHelp">Need help</p>
            </div>
          </div>
        </form>
        <p className="login__new">New to Amazon?</p>
        <Link to="/signup">
          <button className="login__newbutton">
            Create your Amazon account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
