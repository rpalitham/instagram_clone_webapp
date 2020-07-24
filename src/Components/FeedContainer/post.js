import React from "react";

function Post(props) {
  let { post, key } = props;

  return (
    <div className="post" key={key}>
      <header className="header">
        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
        <a href={`/${post["USER.username"]}`}> {post["USER.username"]}</a>
      </header>
      <div className="image-container">
        <img
          src={`http://localhost:8888/api/v1/media/image/${post.media_path[0]}`}
          alt=""
        />
      </div>
      <div className="comments">
        <div className="icons-container">
          <i className="fa fa-heart-o" aria-hidden="true"></i>
          <i className="fa fa-comment-o" aria-hidden="true"></i>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
        <div style={{ margin: "5px 15px" }}>
          {post.likesCount}
          <span style={{ marginLeft: "5px" }}>Likes</span>
        </div>
        <div className="post-description">
          <span>
            <a href={`/${post["USER.username"]}`}> {post["USER.username"]}</a>
          </span>
          &nbsp;
          <span>{post.description}</span>
        </div>
        <div style={{ margin: "5px 15px" }}>
          {post.commentsCount}
          <span style={{ marginLeft: "5px" }}>Comments</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
