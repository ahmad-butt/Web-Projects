import React from "react";
import FeedOptions from "./FeedOptions";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import "./Post.css";

function Post({ post }) {
  return (
    <div className="post">
      <div className="post__header">
        <img src={post.profileImageURL} alt="user" />
        <div className="userInfo">
          <h3>{post.username}</h3>
          <p>{post.userDesc}</p>
        </div>
      </div>
      <div className="post__content">
        <p>{post.body}</p>
      </div>
      {post.postImage && (
        <div className="postImage">
          <img src={post.postImage} alt="post" />
        </div>
      )}
      <div className="post__bottom">
        <FeedOptions Icon={ThumbUpAltIcon} title="Like" />
        <FeedOptions Icon={CommentIcon} title="Comment" />
        <FeedOptions Icon={ShareIcon} title="Share" />
        <FeedOptions Icon={SendIcon} title="Send" />
      </div>
    </div>
  );
}

export default Post;
