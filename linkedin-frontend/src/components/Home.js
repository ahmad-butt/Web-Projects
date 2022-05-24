import React from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import "./Home.css";
import Header from "./Header";
import Widgets from "./Widgets";

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </>
  );
}

export default Home;
