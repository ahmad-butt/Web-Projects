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
import Pusher from 'pusher-js';

export default function App() {
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState("");
  const [messages, setMessages] = useState([]);

  const [ID,setID] = useState();

  const handleSetID = (roomID)=>{
    setID(roomID);
  }

  // const fetchDataFromServer = async (query, variables = {}) => {
  //   const response = await fetch("http://localhost:2000/graphql", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ query, variables }),
  //   });

  //   const result = await response.json();

  //   return result;
  // };

  // useEffect(async ()=>{
  //   let roomID;
  //   if(ID) {
  //     roomID = {
  //       id: ID.toString()
  //     }
  //   }
  //   const query = `
  //   query getRoomData($roomID: RoomInput!){
  //     aboutRoom(roomID: $roomID){
  //       messages{
  //         name
  //         message
  //         timestamp
  //         received
  //       }
  //     }
  //   }
  //   `
  //   const result = await fetchDataFromServer(query, {roomID});

  //   await setMessages(result?.data?.aboutRoom?.messages);
  // },[ID])

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

  // useEffect(()=>{
  //   var pusher = new Pusher('2c49e7195e6048351c01', {
  //     cluster: 'eu'
  //   });

  //   var channel = pusher.subscribe('messages');
  //   channel.bind('updated', (data)=> {
  //     setMessages([...messages, data]);
  //   });

  //   return ()=>{
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   }
  // },[messages])

  const user = useSelector(selectUser);

  return (

      <div className="app">
        <div className="app__body">
          {user ? (
            <Router>
              <Sidebar profilePicture={profilePicture} />
              <Switch>
                <Route path="/rooms/:roomID">
                  <Chat handleSetID={handleSetID} messageData={messages}/>
                </Route>
                <Route path="/">
                  <Chat handleSetID={handleSetID} messageData={messages}/>
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
