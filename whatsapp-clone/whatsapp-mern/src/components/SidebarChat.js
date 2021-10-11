import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SidebarChat.css";

function SidebarChat(props) {
  return (
    <Link className="sidebarChat__link" to={`/rooms/${props.roomID}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h3>{props.roomName}</h3>
          <p>{props.lastMessage}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
