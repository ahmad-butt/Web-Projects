import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { setSignIn } from './features/user/userSlice';
import { auth } from './firebase';

function App() {

  const dispatch = useDispatch();

  const [movieDetail, setMovieDetail] = useState();

  const handleMovieDetail = (movie)=>{
    setMovieDetail(movie);
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        dispatch(
          setSignIn({
            username: authUser?.displayName,
            email: authUser?.email
          })
        );    
      } else {
        dispatch(
          setSignIn({
            username: null,
            email: null
          })
        );
      }
    })

    return ()=>unsubscribe();
  },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/home'>
            <Home handleMovieDetail={handleMovieDetail}/>  
          </Route>
          <Route path='/detail/:id'>
            <Detail movieDetail = {movieDetail}/>
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
