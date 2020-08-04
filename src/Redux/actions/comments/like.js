import axios from "axios";

export const like = async ({ id, type, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/comment/${id}/${type}`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(apiUrl, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};
