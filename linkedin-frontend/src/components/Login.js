import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const signin = async (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/home"))
      .catch((e) => alert(e.message));
  };
  return (
    <div className="login">
      <div className="login__header">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2019-present.jpg"
          alt="logo"
        />
        <form onSubmit={signin}>
          <div className="login__form">
            {/* <form onSubmit={signin}> */}
            <div className="form">
              <h1>Sign in</h1>
              <p>Stay updated on your professional world</p>
              <div className="form__items">
                <input
                  value={email}
                  onChange={handleEmail}
                  type="text"
                  placeholder="Email or Phone"
                />
                <input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Link to="/signup">
                <h3>Does not have an account?</h3>
              </Link>
              <div className="form__items">
                <button onClick={signin}>Sign in</button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
