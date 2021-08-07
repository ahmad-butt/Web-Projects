import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../features/user/userSlice";
import { setIncrement } from "../features/counter/counterSlice";
import "./Chat.css";

function Chat() {
  //State Declaration
  const [messageData, setMessageData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  let { roomID } = useParams();
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  //Selecting From Store
  const username = useSelector(selectUsername);

  //Event Handlers
  const handleNewMessage = (event) => {
    event.preventDefault();
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessageToAdd = {
      name: username,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      received: true,
    };
    const idOfRoomInWhichInsertingNewMessage = {
      id: roomID.toString(),
    };
    createNewMessage(newMessageToAdd, idOfRoomInWhichInsertingNewMessage);
    setNewMessage("");
  };

  //This Function Fetches Data from Server
  const fetchDataFromServer = async (query, variables={})=>{
    const response = await fetch('http://localhost:2000/graphql',{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({query, variables})
    })
    const result = await response.json();
    return result;
  }

  // This Function Updates last message in DB
  const updateLastMessage = async(newMessage, roomID) => {
    const query = `
    mutation setLastMessage($newMessage: MessageInputs!, $roomID: RoomInput!){
      updateLastMessage(newMessage: $newMessage, roomID: $roomID){
        message
        name
        timestamp
        received
      }
    }`;
    fetchDataFromServer(query,{newMessage,roomID})
  };

  //This Function Loads Messages from DB
  const loadMessages = async () => {
    let id;
    if (roomID) {
      id = {
        id: roomID.toString(),
      };
    } else {
      id = {
        id: "tempID1",
      };
    }
    const query = `
    query getRoomData($id: RoomInput!) {
      aboutRoom(roomID: $id){
        messages {
          message
          received
          timestamp
          name
        }
      }
    }
    `;
    const result = await fetchDataFromServer(query,{id});

    setMessageData(result?.data?.aboutRoom?.messages);
  };

  // This Function creates New Messages in the DB
  const createNewMessage = async (newMessage, roomID) => {
    const query = `
            mutation addMessage($newMessage: MessageInputs!, $roomID: RoomInput!) {
                newMessage(newMessage: $newMessage, roomID: $roomID) {
                    message
                    name
                    timestamp
                    received
                }
            } 
        `;

    const result = await fetchDataFromServer(query,{newMessage,roomID});

    if (result) {
      updateLastMessage(newMessage, roomID);
      dispatch(setIncrement());
      loadMessages();
    }
  };

  // These Hooks Are used to handle when functions are going to shoot
  useEffect(() => {
    if (roomID) {
      async function fetchingRoomData() {
        const id = {
          id: roomID.toString(),
        };
        const query = `
        query getRoomData($id: RoomInput!) {
          aboutRoom(roomID: $id){
            id
            name
            lastMessage
          }
        }
        `;
        const response = await fetch("http://localhost:2000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables: { id } }),
        });
        const result = await response.json();
        if (result.data !== null) {
          setRoomName(result.data.aboutRoom.name);
        } else {
          setRoomName("");
        }
      }
      fetchingRoomData();
    } else {
      roomID = "Welcome Page";
      setRoomName("Welcome Here");
    }
  }, [roomID]);

  useEffect(() => {
    loadMessages();
  }, [roomID]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {messageData && messageData[messageData?.length - 1]?.timestamp ? (
            <p>
              Last seen at {messageData[messageData?.length - 1]?.timestamp}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messageData ? (
          messageData.map((message, index) => {
            return (
              <p
                key={index}
                className={`chat__message ${
                  message.name === username && "chat__receiver"
                }`}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
              </p>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
      {
        !roomID || roomID==='Welcome Page' ? (
          <p></p>
        ) : (
          <div className="chat__footer">
            <InsertEmoticon />
            <form>
              <input
                value={newMessage}
                onChange={handleNewMessage}
                type="text"
                placeholder="Type a message"
              />
              <button onClick={handleSubmit} type="submit">
                Send a message
              </button>
            </form>
            <MicIcon />
          </div>
        )
      }
    </div>
  );
}
export default Chat;