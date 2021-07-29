import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername } from "../features/user/userSlice";

function Chat() {
  const [messageData, setMessageData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState("");

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
    }
  }, [roomID]);

  const handleNewMessage = (event) => {
    event.preventDefault();
    setNewMessage(event.target.value);
  };

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
    const response = await fetch("http://localhost:2000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { newMessage, roomID } }),
    });

    const result = await response.json();

    if (result) {
      loadMessages();
    }
  };

  const username = useSelector(selectUsername);

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
    }
    createNewMessage(newMessageToAdd, idOfRoomInWhichInsertingNewMessage);
    setNewMessage("");
  };

  const loadMessages = async () => {
    let id;
    if(roomID) {
      id = {
        id: roomID.toString(),
      };
    } else {
      id = {
        id: "tempID1"
      }
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
    const response = await fetch("http://localhost:2000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { id } }),
    });
    const result = await response.json();

    setMessageData(result.data.aboutRoom.messages);
  };
  useEffect(() => {
    loadMessages();
  }, [roomID]);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
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
        {
          messageData ?
          messageData.map((message, index) => {
            return (
              <p
                key={index}
                className={`chat__message ${
                  message.received && "chat__receiver"
                }`}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
              </p>
            );
          }) : (
            <p></p>
          )
        }
      </div>
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
    </div>
  );
}

export default Chat;
