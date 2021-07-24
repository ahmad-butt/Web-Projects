import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);
    return (
      <div className="app">
        {
          !user ? (
            <Login />
          ) : (
            <div className="app__body">
              <Router>
                <Sidebar />
                <Switch>
                  <Route path='/rooms/:roomID'>
                    <Chat />
                  </Route>
                  <Route path='/'>
                    <Chat />
                  </Route>
                </Switch>
              </Router>
            </div>
          )
        }
        </div>
    );
}