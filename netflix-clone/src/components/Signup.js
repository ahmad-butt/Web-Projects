import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userDetails) => {
        userDetails.user.updateProfile({ displayName: username });
      })
      .catch((error) => {
        alert(error.message);
      });
    history.push("/");
  };

  return (
    <Container>
      <Logo src="/images/logo.png" />
      <Content>
        <h1>Sign Up</h1>
        <InputForm>
          <input
            value={username}
            onChange={handleUsername}
            type="text"
            placeholder="Username"
          />
          <input
            value={email}
            onChange={handleEmail}
            type="text"
            placeholder="Email or phone number"
          />
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
          <button onClick={signup}>Sign Up</button>
          <p>
            Already on Netflix?{" "}
            <Link to="/">
              <strong>Login now.</strong>
            </Link>
            <br></br>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </p>
        </InputForm>
      </Content>
    </Container>
  );
}

export default Signup;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  display: flex;

  &:before {
    height: 100vh;
    content: "";
    position: absolute;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("/images/login-background.jpg") center center / cover no-repeat fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;
const Logo = styled.img`
  max-width: 250px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: -18px;
  margin-left: -40px;
  @media screen and (max-width: 650px) {
    max-width: 150px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 5px;
    margin-left: 5px;
  }
`;
const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  margin-top: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  height: 628px;
  width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  h1 {
    color: white;
    font-size: 35px;
    margin-top: 60px;
    margin-left: 50px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 650px) {
    height: 500px;
    width: 300px;
    h1 {
      color: white;
      font-size: 25px;
      margin-top: 30px;
      margin-left: 20px;
      margin-bottom: 10px;
    }
  }
`;
const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  input {
    padding: 17px;
    margin-top: 20px;
    border: 1px solid #333;
    border-radius: 5px;
    font-size: 15px;
    background-color: #333;
    color: #8c8c8c;
    outline: none;
  }
  button {
    margin-top: 40px;
    padding: 17px;
    border: 1px solid red;
    border-radius: 5px;
    font-size: 15px;
    background-color: red;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
  div {
    span {
      color: #8c8c8c;
      margin-left: 3px;
    }
  }
  p {
    width: 350px;
    color: #8c8c8c;
    strong {
      color: white;
      text-decoration: none;
    }
    br {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 650px) {
    width: 260px;
    input {
      padding: 12px;
      font-size: 12px;
    }
    button {
      padding: 12px;
      font-size: 12px;
    }
    p {
      width: 260px;
      color: #8c8c8c;
      text-align: justify;
      font-size: 12px;
    }
  }
`;
