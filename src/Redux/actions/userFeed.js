import {
  USER_FEED_FAILURE,
  USER_FEED_REQUEST,
  USER_FEED_SUCCESS,
} from "../constants";
import axios from "axios";

const userFeedRequest = () => ({
  type: USER_FEED_REQUEST,
});

const userFeedSuccess = (data) => ({
  type: USER_FEED_SUCCESS,
  data,
});

const userFeedFailure = (error) => ({
  type: USER_FEED_FAILURE,
  error,
});

export const getFeed = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userFeedRequest());
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/user/feed`;
      let { token } = getState().user;
      let headers = {
        headers: {
          auth_token: process.env.auth_token,
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.get(apiUrl, headers);
      dispatch(userFeedSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(userFeedFailure(err));
    }
  };
};
