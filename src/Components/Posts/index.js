import React from "react";
import "./index.css";

class Posts extends React.Component {
  render() {
    let { rows } = this.props;
    return (
      <div className="posts-container">
        {rows.map((row, index) => (
          <div className="post" key={index}>
            <img
              src={`http://localhost:8888/api/v1/media/image/${row.media_path[0]}`}
              alt=""
            ></img>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
