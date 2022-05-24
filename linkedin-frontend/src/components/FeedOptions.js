import React from "react";
import "./FeedOptions.css";

function FeedOptions({ Icon, title, color, handleClick }) {
  return (
    <div onClick={handleClick && handleClick} className="feedOptions">
      {Icon && <Icon className="feed__icon" style={{ color: color }} />}
      <p>{title}</p>
    </div>
  );
}

export default FeedOptions;
