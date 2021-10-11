import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AmazonBasics from "./components/AmazonBasics";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./actions/userActions";
import Cart from "./components/Cart";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser?.displayName, authUser?.email))
      } else {
        dispatch(setUser(null, null))
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/AmazonBasics">
            <AmazonBasics />
          </Route>
          <Route path="/Electronics">
            <AmazonBasics />
          </Route>
          <Route path="/Computers & Accessories">
            <AmazonBasics />
          </Route>
          <Route path="/Oculus">
            <AmazonBasics />
          </Route>
          <Route path="/Gaming">
            <AmazonBasics />
          </Route>
          <Route path="/Clothing">
            <AmazonBasics />
          </Route>
          <Route path="/Shoes">
            <AmazonBasics />
          </Route>
          <Route path="/Bags">
            <AmazonBasics />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
