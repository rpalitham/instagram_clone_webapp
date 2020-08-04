import axios from "axios";

export const create = async ({ postId, payload, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/comment/${postId}/add`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(apiUrl, paylaod, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getComments = ({ id, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/comment/${id}`;
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
}
