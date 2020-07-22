import * as constants from "../constants";

const initialState = {
  authorized: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOGIN_SUCCESS:
      return { ...state, ...action.data, authorized: true };

    case constants.USER_LOGOUT_REQUEST:
      return initialState;

    default:
      return state;
  }
}
