import React from "react";
import "./Menu.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function Menu() {
  return (
    <div className="menu">
      <div className="menu__items">
        <div className='menu__itemsMenu'>
            <MenuOutlinedIcon className="menuIcon" /><span>All</span>
        </div>
        <div className='menu__itemsList'>
            <span>Todays's Deals</span>
            <span>Customer Service</span>
            <span>Registory</span>
            <span>Gift Cards</span>
            <span>Sell</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
