import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";

function SidebarChat(props) {
  const [lm, setLm] = useState('');
  useEffect(async () => {
    let roomNo;
    if(props.roomID) {
      roomNo = {
        id: props.roomID
      }
    }
    const query = `
    query lastMessage($roomNo: RoomInput!){
      aboutRoom(roomID: $roomNo) {
        lastMessage
      }
    }
    `
    const result = await props.fetchDataFromServer(query, {roomNo});
    setLm(result?.data?.aboutRoom?.lastMessage);
  }, [props.lastMessage])
  return (
    <Link className="sidebarChat__link" to={`/rooms/${props.roomID}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h3>{props.roomName}</h3>
          <p>{lm}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
