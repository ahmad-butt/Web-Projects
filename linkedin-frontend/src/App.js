import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { auth, db } from "./firebase";
import { useDispatch } from "react-redux";
import { login, updateDescription } from "./reducers/User/userSlice";

function App() {
  const dispatch = useDispatch();

  // const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const ref = db.collection("user").doc(authUser?.email);
        const doc = await ref.get();
        await dispatch(
          updateDescription({
            description: doc.data().description,
          })
        );
        dispatch(
          login({
            email: authUser?.email,
            username: authUser?.displayName,
          })
        );
      } else {
        dispatch(
          login({
            email: null,
            username: null,
          })
        );
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
