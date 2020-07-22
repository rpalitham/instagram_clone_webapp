import { push } from "react-router-redux";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from "../constants";
import axios from "axios";

export const userLoginSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  data,
});

export const userLoginFail = (error) => ({
  type: USER_LOGIN_FAILURE,
  error,
});

// export const userLogoutSuccess = () => ({
//   type: USER_LOGOUT_SUCCESS,
// });

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(push("/auth/login"));
      dispatch({ type: USER_LOGOUT_REQUEST });
      // dispatch(userLogoutSuccess());
    } catch (err) {
      console.log(err);
    }
  };
};

export const login = (payload) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: USER_LOGIN_REQUEST });
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/auth/login`;
      let headers = {
        headers: {
          auth_token: process.env.REACT_APP_AUTH_TOKEN,
          "Content-Type": "application/json",
        },
      };
      let { status, data } = await axios.post(apiUrl, payload, headers);
      if (status === 200) {
        dispatch(userLoginSuccess(data));
        dispatch(push("/"));
      } else {
        dispatch(userLoginFail(data.message));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
