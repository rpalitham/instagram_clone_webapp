import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_FAILURE,
  UPDATE_USER_REGISTRATION,
} from "../constants";
import axios from "axios";

const userRegistrationRequest = () => ({
  type: USER_REGISTRATION_REQUEST,
});

const userRegistrationSuccess = (data) => ({
  type: USER_REGISTRATION_SUCCESS,
  data,
});

const userRegistrationFail = (error) => ({
  type: USER_REGISTRATION_FAILURE,
  error,
});

export const updateRegistrationDetails = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_USER_REGISTRATION,
      ...payload,
    });
  };
};

export const register = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(userRegistrationRequest());
      let apiUrl = `${process.env.REACT_APP_INSTAGRAM_API_URL}/api/v1/auth/register`;
      let requestBody = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        auth_type: "instagram",
      };
      let headers = {
        headers: {
          auth_token: process.env.auth_token,
          "Content-Type": "application/json",
        },
      };
      let { status, data } = await axios.post(apiUrl, requestBody, headers);
      if (status === 201) {
        dispatch(userRegistrationSuccess(data));
      } else {
        dispatch(userRegistrationFail(data.message));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
