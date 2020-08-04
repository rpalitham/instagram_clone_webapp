import axios from "axios";

export const likePost = async ({ id, token, type }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/likes/${id}/${type}`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(apiUrl, {}, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostLikes = async ({ id, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/likes/${id}`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(apiUrl, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};
