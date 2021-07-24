import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const [messageData, setMessageData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomID) {
      async function fetchingRoomData(){
        const id = {
          id: roomID.toString()
        }
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
        if(result.data!==null) {
          setRoomName(result.data.aboutRoom.name);
        } else {
          setRoomName('');
        }
      }
      fetchingRoomData()
    }
  }, [roomID]);

  const handleNewMessage = (event) => {
    event.preventDefault();
    setNewMessage(event.target.value);
  };

  const createNewMessage = async (newMessage) => {
    const query = `
            mutation addMessage($newMessage: MessageInputs!) {
                newMessage(newMessage: $newMessage) {
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
      body: JSON.stringify({ query, variables: { newMessage } }),
    });

    const result = await response.json();

    if (result) {
      loadMessages();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessageToAdd = {
      name: "Ahmad Butt",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      received: true,
    };
    createNewMessage(newMessageToAdd);
    setNewMessage("");
  };

  const loadMessages = async () => {
    const query = `
            query{
                aboutMessage{
                    name
                    message
                    timestamp
                    received
                }
            }
        `;
    const response = await fetch("http://localhost:2000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    setMessageData(result.data.aboutMessage);

    // console.log(result);
  };
  useEffect(() => {
    loadMessages();
  }, []);
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
        {messageData.map((message, index) => {
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
        })}
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