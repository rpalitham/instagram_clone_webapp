import axios from "axios";

export const createPost = async ({ files, desc, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/post`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
        Accept: "multipart/form-data",
      },
    };
    let payload = { media_type: "img", description: desc };
    let formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("files", files[key]);
    }
    formData.append("payload", JSON.stringify(payload));
    let { data } = await axios.post(apiUrl, formData, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};
