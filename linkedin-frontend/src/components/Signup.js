import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth, db } from "../firebase";
import "./Login.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({ displayName: username });
        history.push("/");
      })
      .catch((e) => alert(e.message));
    db.collection("user").doc(email).set({
      description: description,
    });
    setEmail("");
    setUsername("");
    setDescription("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="login__header">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2019-present.jpg"
          alt="logo"
        />
        <div className="login__form">
          <form onSubmit={signup}>
            <div className="form">
              <h1>Sign Up</h1>
              <p>Stay updated on your professional world</p>
              <div className="form__items">
                <input
                  value={username}
                  onChange={handleUsername}
                  type="text"
                  placeholder="Username"
                />
                <input
                  value={description}
                  onChange={handleDescription}
                  type="text"
                  placeholder="User Description"
                />
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
              <h3>Already have an account?</h3>
              <div className="form__items">
                <button onClick={signup}>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
