import React from "react";
import "./Sidebar.css";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";

function Sidebar() {
  const username = useSelector((state) => state.user.username);

  const desc = useSelector((state) => state.user.description);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          className="sidebar__cover"
          src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
          alt="cover"
        />
        <img
          className="sidebar__profilePic"
          src="https://media-exp1.licdn.com/dms/image/C4E03AQEW0xVH5gG2Nw/profile-displayphoto-shrink_100_100/0/1649002819973?e=1654732800&v=beta&t=FKmxrnv75VPo3TeSBeM_ipBh7gZQzEA-AhIkeKLeNX8"
          alt="me"
        />
        <div className="sidebar__myinfo">
          <p className="name">{username}</p>
          <p className="myInfo">{desc}</p>
        </div>
        <div className="sidebar__connections">
          <div className="connInfo">
            <p className="conn">Connections</p>
            <p className="connCount">16</p>
          </div>
          <p className="network">Get Your Network</p>
        </div>
        <div className="sidebar__extra">
          <p className="conn">Access exclusive tools & insigts</p>
          <p className="network">🟨Try Premium for free</p>
        </div>
        <div className="items">
          <BookmarkIcon className="bookmark" />
          <p>My Items</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <div className="options">
          <p>Groups</p>
          <div className="event">
            <p>Events</p>
            <AddIcon className="add" />
          </div>
          <p>Followed Hashtags</p>
        </div>
        <p className="disc">Discover More</p>
      </div>
    </div>
  );
}

export default Sidebar;
