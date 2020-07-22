import * as constants from "../constants";

const initialState = {
  data: [],
  error: false,
  errorMessage: "",
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.USER_FEED_SUCCESS:
      return { ...state, loading: false, data: action.data };

    case constants.USER_FEED_REQUEST:
      return { ...state, loading: true };

    case constants.USER_FEED_FAILURE:
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
