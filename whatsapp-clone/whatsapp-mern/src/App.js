import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserInfo } from "./features/user/userSlice";
import { auth } from "./firebase";
import { useState } from "react";

export default function App() {

  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        dispatch(setUserInfo({
          user: authUser.emailVerified,
          username: authUser.displayName,
          email: authUser.email
        }))
        setProfilePicture(authUser.photoURL);
      } else {
        dispatch(setUserInfo({
          user: false,
          username: null,
          email: null
        }))
      }
    })
    return ()=>{
      unsubscribe();
    }
  },[])
  
  const user = useSelector(selectUser);

  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <Router>
            <Sidebar profilePicture={profilePicture}/>
            <Switch>
              <Route path="/rooms/:roomID">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
