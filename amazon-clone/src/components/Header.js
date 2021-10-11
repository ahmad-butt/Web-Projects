import React from "react";
import "./Header.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FlagIcon from "@mui/icons-material/Flag";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Menu from "./Menu.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { setUser } from "../actions/userActions";

function Header() {
  const count = useSelector((state) => state.product.count);
  const user = useSelector((state) => state.user.email);

  const dispatch = useDispatch();

  const signout = () => {
    auth.signOut().then(dispatch(setUser("", "")));
  };

  return (
    <>
      <div className="header">
        <div className="header__items">
          <Link to="/">
            <img
              className="header__itemsLogo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
              alt="amazon_logo"
            />
          </Link>
          <div className="header__itemsLocation">
            <LocationOnOutlinedIcon className="locationIcon" />
            <div>
              <span>Deliver to</span>
              <h4>Pakistan</h4>
            </div>
          </div>
          <div className="header__itemsSearch">
            <button className="header__itemsSearchAll">All</button>
            <input className="header__itemsSearchInput" type="text" />
            <button className="header__itemsSearchSearch">
              <SearchIcon />
            </button>
          </div>
          <FlagIcon className="flagIcon" />
          <div onClick={signout} className="header__itemsUserInfo">
            {user === "" || user === null ? (
              <span>Hello, Sign in</span>
            ) : (
              <span>Hello, {`${user}`}</span>
            )}
            <h4>Accounts & Lists</h4>
          </div>
          <div style={{ marginLeft: "30px" }} className="header__itemsUserInfo">
            <span>Returns</span>
            <h4>& Orders</h4>
          </div>
          <div className="header__itemsCart">
            <Link className='header__itemsCartLink' to="/cart">
              <span>{count}</span>
            </Link>
            <Link className='header__itemsCartLink' to='/cart'>
              <ShoppingCartOutlinedIcon className="shoppingCartIcon" />
            </Link>
          </div>
          <Link className='header__itemsCartLink' to='/cart'>
            <h4 className="cart">Cart</h4>
          </Link>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default Header;
