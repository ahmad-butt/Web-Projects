import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CheckOut from './Components/CheckOut';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase'
import { useEffect } from 'react';
function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
    console.log(user);
    return () => {
      unsubscribe();
    }
  }, [auth.currentUser])

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/checkout'>
            <Header />
            <CheckOut />
          </Route>
          <Route path='/Login'>
            <Login />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
