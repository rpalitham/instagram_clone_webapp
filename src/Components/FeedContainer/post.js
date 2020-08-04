import React, { useState, useEffect } from "react";
import { getPostLikes, likePost } from "../../Redux/actions/posts/";
import { getComments, create } from "../../Redux/actions/comments";

function Post(props) {
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [commmentsCount, setCommentsCount] = useState("");
  const [likes, setLikes] = useState("");
  const [userLiked, setUserLike] = useState("");

  let { post, key, user } = props;

  const getLikes = async () => {
    let { id } = post;
    let { token } = user;
    let { userLiked, likesCount } = await getPostLikes({ id, token });
    setLikes(likesCount);
    setUserLike(userLiked);
  };

  const getComments = async () => {
    let { id } = post;
    let { token } = user;
    let { commentsCount, comments } = await getComments({
      id,
      token,
      limit: 2,
    });
    setComments(comments);
    setCommentsCount(commentsCount);
  };

  useEffect(() => {
    const fetchData = async () => {
      getLikes();
      getComments();
    };
    fetchData();
  }, []);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    let { id } = post;
    let { token } = user;
    let payload = { text: comment };
    let data = await create({ id, token, payload });
    console.log("data", data);
  };

  const LikePost = async (type) => {
    let { id } = post;
    let { token } = user;
    let data = await likePost({ id, token, type });
    if (data) {
      getLikes();
    }
  };

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
          {userLiked ? (
            <i
              className="fa fa-heart"
              onClick={() => LikePost("unlike")}
              aria-hidden="true"
              style={{
                color: "red",
              }}
            ></i>
          ) : (
            <i
              className="fa fa-heart-o"
              onClick={() => LikePost("like")}
              aria-hidden="true"
            ></i>
          )}

          <i className="fa fa-comment-o" aria-hidden="true"></i>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
        <div style={{ margin: "5px 15px" }}>
          {likes}
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
          {post.commentsCount ? post.commentsCount : 0}
          <span style={{ marginLeft: "5px" }}>Comments</span>
        </div>
      </div>
      <div className="footer">
        <form>
          <textarea
            type="text"
            value={comment}
            name="comment"
            placeholder="Add a comment ...."
            onChange={handleComment}
          />
          <button type="submit" onClick={handleCommentSubmit}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
