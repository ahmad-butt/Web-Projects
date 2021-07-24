import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import './App.css';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/home'>
            <Home />  
          </Route>
          <Route path='/detail/:id'>
            <Detail />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
