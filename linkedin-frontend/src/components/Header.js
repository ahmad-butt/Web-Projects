import React from "react";
import "./Header.css";
import HeaderOption from "./HeaderOption";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { SupervisorAccount } from "@material-ui/icons";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";

import "./HeaderOption.css";
// import { auth } from "../firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { signOut, getAuth } from "firebase/auth";
import { logout } from "../reducers/User/userSlice";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      history.replace("/");
      dispatch(logout);
    });
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt=""
        />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__option">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={MessageIcon} title="Messages" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption
          avatar="https://media-exp1.licdn.com/dms/image/C4E03AQEW0xVH5gG2Nw/profile-displayphoto-shrink_100_100/0/1649002819973?e=1654732800&v=beta&t=FKmxrnv75VPo3TeSBeM_ipBh7gZQzEA-AhIkeKLeNX8"
          title="Me"
          signout={signout}
        />
        <div className="more">
          <HeaderOption Icon={AppsIcon} title="Work" />
          <div className="info">
            <span>Try Premium for </span>
            <span>free</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
