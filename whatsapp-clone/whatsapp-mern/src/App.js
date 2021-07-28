import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";

export default function App() {
  
  const user = useSelector(selectUser);

  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <Router>
            <Sidebar />
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
