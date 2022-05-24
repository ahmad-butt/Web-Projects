import React from "react";
import "./WidgetItem.css";

function WidgetItem({ image, title, desc }) {
  return (
    <div className="widgetItem">
      <img src={image} alt="profile" />
      <div className="widget__info">
        <h3>{title}</h3>
        <p>{desc}</p>
        <button>+ Follow</button>
      </div>
    </div>
  );
}

export default WidgetItem;
