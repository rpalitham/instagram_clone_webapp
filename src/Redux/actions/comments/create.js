import axios from "axios";

export const create = async ({ id, payload, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/comments/${id}/add`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(apiUrl, payload, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPostComments = async ({ id, token, limit }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/comments/${id}?limit=${limit}`;
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
