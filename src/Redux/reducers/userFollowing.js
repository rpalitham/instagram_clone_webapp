import * as constants from "../constants";

const initialState = {
  error: false,
  errorMessage: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.USER_FOLLOWING_SUCCESS:
      return { ...state, loading: false, ...action.data };

    case constants.USER_FOLLOWING_REQUEST:
      return { ...state, loading: true };

    case constants.USER_FOLLOWING_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        showError: true,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
