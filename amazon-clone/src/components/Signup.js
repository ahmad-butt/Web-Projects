import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return (authUser.user.updateProfile({displayName: name}),
        history.push("/login"))
      })
        .catch((err) => {
          alert(err);
        });
        setName("");
        setEmail("");
        setPassword("");
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
          <div className="signup__itemsForm">
            <h2 className="login__itemsFormHeading">Sign-In</h2>
            <div className="login__itemsFormInput">
              <p>Your name</p>
              <input value={name} onChange={handleName} type="text" />
              <p>Email</p>
              <input value={email} onChange={handleEmail} type="text" />
              <p>Password</p>
              <input
                value={password}
                onChange={handlePassword}
                type="password"
              />
              <button onClick={handleSignup} className="login__itemsFormButton">
                Create your account
              </button>
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
        <button className="login__newbutton">Create your Amazon account</button>
      </div>
    </div>
  );
}

export default Signup;
