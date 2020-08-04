import axios from "axios";

export const deleteComment = async ({ id, token }) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/comment/${id}`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.delete(apiUrl, headers);
    return data;
  } catch (err) {
    console.log(err);
  }
};
