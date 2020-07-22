import React, { useState } from "react";
import { createPost } from "../../Redux/actions/posts/create";
import "./upload.css";

function CreatePost(props) {
  const [files, setFiles] = useState([]);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    let reader = new FileReader();
    reader.onload = function (e) {
      let img = document.getElementById("img-preview");
      img.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    let {
      LoggedInUser: { token },
      user,
      toggle,
    } = props;
    await createPost({ files, desc, token });
    toggle();
    user.getFeed();
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="upload">
        <input
          style={{ display: "none" }}
          type="file"
          id="fileElem"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
        />
        {files.length ? (
          <div className="image-container">
            <img id="img-preview" alt="img"></img>
          </div>
        ) : (
          <label htmlFor="fileElem">Select Images to Share</label>
        )}
        {files.length ? (
          <div className="desc">
            <textarea
              placeholder="Texts description what's in the photo"
              value={desc}
              onChange={handleDesc}
            />
          </div>
        ) : null}
        {files.length ? (
          <div className="footer">
            <button type="submit" onClick={handleSubmit}>
              Post
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CreatePost;
