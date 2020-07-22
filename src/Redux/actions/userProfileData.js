import {
  USER_INFO_FAILURE,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_DATA_FAILURE,
  USER_DATA_SUCCESS,
  USER_DATA_REQUEST,
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_FAILURE,
  USER_FOLLOWING_SUCCESS,
} from "../constants";
import axios from "axios";

const userInfoRequest = () => ({
  type: USER_INFO_REQUEST,
});

const userDataRequest = () => ({
  type: USER_DATA_REQUEST,
});

const userDataSuccess = (data) => ({
  type: USER_DATA_SUCCESS,
  data,
});

const userDataFailure = (error) => ({
  type: USER_DATA_FAILURE,
  error,
});

const userInfoSuccess = (data) => ({
  type: USER_INFO_SUCCESS,
  data,
});

const userInfoFailure = (error) => ({
  type: USER_INFO_FAILURE,
  error,
});

const userFollowingRequest = () => ({
  type: USER_FOLLOWING_REQUEST,
});

const userFollowingSuccess = (data) => ({
  type: USER_FOLLOWING_SUCCESS,
  data,
});

const userFollowingFailure = (error) => ({
  type: USER_FOLLOWING_FAILURE,
  error,
});

export const getUserInfo = (username) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userInfoRequest());
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/user/${username}`;
      let { token } = getState().user;
      let headers = {
        headers: {
          auth_token: process.env.auth_token,
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.get(apiUrl, headers);
      dispatch(userInfoSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(userInfoFailure(err));
    }
  };
};

export const getUserData = (username, type) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userDataRequest());
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/user/${username}/${type}`;
      let { user } = getState();
      let headers = {
        headers: {
          auth_token: process.env.auth_token,
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(apiUrl, headers);
      dispatch(userDataSuccess(data));
    } catch (err) {
      dispatch(userDataFailure(err.message));
      console.log(err);
    }
  };
};

export const getUserFollowing = (username) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userFollowingRequest());
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/friendships/${username}`;
      let { user } = getState();
      let headers = {
        headers: {
          auth_token: process.env.auth_token,
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(apiUrl, headers);
      dispatch(userFollowingSuccess(data));
    } catch (err) {
      dispatch(userFollowingFailure(err.message));
      console.log(err);
    }
  };
};
