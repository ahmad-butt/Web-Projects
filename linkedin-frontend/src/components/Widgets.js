import React from "react";
import "./Widgets.css";
import WidgetItem from "./WidgetItem";

function Widgets() {
  return (
    <div className="widgets">
      <p>Add to your feed</p>
      <div className="widget__items">
        <WidgetItem
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
          title="Instagram"
          desc="This is Instagram's official profile on Linkedin"
        />
        <WidgetItem
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png"
          title="Facebook"
          desc="This is Facebook's official profile on Linkedin"
        />
        <WidgetItem
          image="https://www.freepnglogos.com/uploads/snapchat-logo-png-0.png"
          title="Snapchat"
          desc="This is Snapchat's official profile on Linkedin"
        />
        <p>View all recommendations</p>
      </div>
    </div>
  );
}

export default Widgets;
