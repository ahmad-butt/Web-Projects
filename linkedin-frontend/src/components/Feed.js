import React, { useEffect, useRef, useState } from "react";
import "./Feed.css";
import FeedOptions from "./FeedOptions";
import PanoramaIcon from "@material-ui/icons/Panorama";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Post from "./Post";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const hiddenFileInput = useRef(null);

  const username = useSelector((state) => state.user.username);

  const description = useSelector((state) => state.user.description);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handlePost = (e) => {
    const inp = e.target.value;
    setPost(inp);
  };

  const handleImageAsFIle = (e) => {
    const img = e.target.files[0];
    setImage(img);
  };

  const addPost = async (e) => {
    e.preventDefault();
    var URL = "";
    if (image !== "") {
      await storage
        .ref(`images/${image.name}`)
        .put(image)
        .then((snapshopt) => {
          var prg = (snapshopt.bytesTransferred / snapshopt.totalBytes) * 100;
          setProgress(prg);
        });
      URL = await storage.ref("images").child(image.name).getDownloadURL();
    }
    db.collection("posts").add({
      username: username,
      userDesc: description,
      profileImageURL:
        "https://media-exp1.licdn.com/dms/image/C4E03AQEW0xVH5gG2Nw/profile-displayphoto-shrink_100_100/0/1649002819973?e=1654732800&v=beta&t=FKmxrnv75VPo3TeSBeM_ipBh7gZQzEA-AhIkeKLeNX8",
      body: post,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      postImage: URL,
    });
    setPost("");
    setImage("");
    setProgress(0);
  };

  const getPosts = () => {
    db.collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshopt) =>
        setPosts(
          snapshopt.docs.map((doc) => ({
            id: doc.id,
            body: doc.data().body,
            profileImageURL:
              "https://media-exp1.licdn.com/dms/image/C4E03AQEW0xVH5gG2Nw/profile-displayphoto-shrink_100_100/0/1649002819973?e=1654732800&v=beta&t=FKmxrnv75VPo3TeSBeM_ipBh7gZQzEA-AhIkeKLeNX8",
            userDesc: doc.data().userDesc,
            username: doc.data().username,
            postImage: doc.data().postImage,
          }))
        )
      );
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="feed">
      <div className={image === "" ? "feed__createPost" : "feed__createPost1"}>
        <div className="feed__createPostTop">
          <img
            className="feed__profilePic"
            src="https://media-exp1.licdn.com/dms/image/C4E03AQEW0xVH5gG2Nw/profile-displayphoto-shrink_100_100/0/1649002819973?e=1654732800&v=beta&t=FKmxrnv75VPo3TeSBeM_ipBh7gZQzEA-AhIkeKLeNX8"
            alt="me"
          />
          <div className="feed__input">
            <form onSubmit={addPost}>
              <input
                value={post}
                className="feed__inp"
                onChange={handlePost}
                type="text"
                placeholder="Start a post"
              />
            </form>
          </div>
        </div>
        {image && (
          <div className="selectedImage">
            <p>Image Selected: {image.name}</p>
            <progress value={progress}></progress>
          </div>
        )}
        <div className="feed__createPostBottom">
          <input
            onChange={handleImageAsFIle}
            ref={hiddenFileInput}
            type="file"
          />
          <FeedOptions
            handleClick={handleClick}
            Icon={PanoramaIcon}
            title="Photo"
            color="#70B5F9"
          />
          <FeedOptions Icon={YouTubeIcon} title="Video" color="#7FC15E" />
          <FeedOptions Icon={EventNoteIcon} title="Event" color="#E8B468" />
          <FeedOptions
            Icon={AssignmentIcon}
            title="Write Article"
            color="#FC9295"
          />
          {/* <button onClick={uploadImage}>Upload</button> */}
        </div>
      </div>
      <div className="feed__posts">
        {posts
          .slice(0)
          .reverse()
          .map((post) => {
            return <Post key={post.id} post={post} username={username} />;
          })}
      </div>
    </div>
  );
}

export default Feed;
