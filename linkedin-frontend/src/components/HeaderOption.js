import React from "react";

function HeaderOption({ Icon, title, avatar, signout }) {
  return (
    <div className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && (
        <img onClick={signout} className="avatar" src={avatar} alt="" />
      )}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
