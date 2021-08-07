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
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink, ApolloProvider } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, InMemoryCache } from "@apollo/client";


// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:2000/subscriptions",
//   options: {
//     reconnect: true,
//   },
// });

// const httpLink = new HttpLink({
//   uri: "http://localhost:2000/graphql",
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });

export default function App() {
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setUserInfo({
            user: authUser.emailVerified,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        setProfilePicture(authUser.photoURL);
      } else {
        dispatch(
          setUserInfo({
            user: false,
            username: null,
            email: null,
          })
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const user = useSelector(selectUser);

  return (
      <div className="app">
        <div className="app__body">
          {user ? (
            <Router>
              <Sidebar profilePicture={profilePicture} />
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
