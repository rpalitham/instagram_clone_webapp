import {
  USER_SEARCH_FAILURE,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
} from "../constants";
import axios from "axios";

const userSearchRequest = () => ({
  type: USER_SEARCH_REQUEST,
});

const userSearchSuccess = (data) => ({
  type: USER_SEARCH_SUCCESS,
  data,
});

const userSearchFailure = (error) => ({
  type: USER_SEARCH_FAILURE,
  error,
});

export const search = (username) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userSearchRequest());
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/user/search/?username=${username}&limit=25`;
      let { token } = getState().user;
      let headers = {
        headers: {
          auth_token: process.env.auth_token,
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.get(apiUrl, headers);
      dispatch(userSearchSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(userSearchFailure(err));
    }
  };
};
