import axios from "axios";

export const followUser = async (id, token) => {
  try {
    let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/friendships/${id}/follow`;
    let headers = {
      headers: {
        auth_token: process.env.auth_token,
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(apiUrl, {}, headers);
    return data;
  } catch (error) {
    console.log("error while following user", error);
  }
};
