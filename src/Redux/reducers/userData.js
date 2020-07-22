import * as constants from "../constants";

const initialState = {
  error: false,
  errorMessage: "",
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.USER_DATA_SUCCESS:
      return { ...state, loading: false, ...action.data };

    case constants.USER_DATA_REQUEST:
      return { ...state, loading: true };

    case constants.USER_DATA_FAILURE:
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
