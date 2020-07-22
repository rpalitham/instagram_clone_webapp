import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import userInfoReducer from "./userInfo";
import userDataReducer from "./userData";
import userSearchReducer from "./userSearch";
import userFeedReducer from "./userFeed";
import userFollowingReducer from "./userFollowing";

export default combineReducers({
  user: loginReducer,
  register: registerReducer,
  userInfo: userInfoReducer,
  userData: userDataReducer,
  userSearch: userSearchReducer,
  userFeed: userFeedReducer,
  userFollowing: userFollowingReducer,
});
