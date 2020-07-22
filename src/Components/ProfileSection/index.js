import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../Redux/actions/userProfileData";
import { followUser } from "../../Redux/actions/relationships";
import profile from "../../Images/profile.jpg";
import Posts from "../Posts";
import "./index.css";

class ProfileSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      loading: false,
    };
  }

  handleProfile = async () => {
    let { user, userInfo } = this.props;
    if (user.id !== userInfo.id && !userInfo.following) {
      await followUser(userInfo.id, user.token);
      let { pathname } = this.props.location;
      let username = pathname.split("/")[1];
      let { getUserFollowing } = this.props.actions;
      getUserFollowing(username);
    }
  };

  componentDidMount() {
    let { pathname } = this.props.location;
    let username = pathname.split("/")[1];
    let { getUserInfo, getUserData, getUserFollowing } = this.props.actions;
    let type = this.state.link ? this.state.link : "posts";
    getUserInfo(username);
    getUserFollowing(username);
    getUserData(username, type);
  }

  render() {
    let { user, userInfo, userData, userFollowing } = this.props;
    let { loading } = this.state;
    return (
      <div>
        {userInfo.loading ? (
          <div
            style={{ textAlign: "center", margin: "14%", fontSize: "100px" }}
          >
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </div>
        ) : (
          <div className="profile-container">
            <div className="main-content">
              <header className="profile-header">
                <div className="profile-image">
                  <button>
                    <img
                      src={profile}
                      style={{ borderRadius: "50%" }}
                      alt="profile"
                    ></img>
                  </button>
                </div>
                <div className="profile-desc">
                  <div className="top-layer">
                    <h2 className="profile-name">{userInfo.username}</h2>
                    <button
                      className="edit-button"
                      onClick={this.handleProfile}
                      style={
                        user.id !== userInfo.id
                          ? userFollowing.following
                            ? {}
                            : { background: "#0095f6", color: "white" }
                          : {}
                      }
                    >
                      {user.id !== userInfo.id
                        ? userFollowing.following
                          ? "Message"
                          : "Follow"
                        : "Edit Profile"}
                    </button>
                    <div className="settings">
                      <button className="settings-button">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="middle-layer">
                    <ul>
                      <li>
                        <span style={{ fontSize: "16px" }}>
                          <span style={{ fontWeight: "600", color: "#262626" }}>
                            {userInfo.postsCount}{" "}
                          </span>
                          Posts
                        </span>
                      </li>
                      <li>
                        <span style={{ fontSize: "16px" }}>
                          <span style={{ fontWeight: "600", color: "#262626" }}>
                            {userInfo.followingCount}{" "}
                          </span>
                          following
                        </span>
                      </li>
                      <li>
                        <span style={{ fontSize: "16px" }}>
                          <span style={{ fontWeight: "600", color: "#262626" }}>
                            {userInfo.followersCount}{" "}
                          </span>
                          followers
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bottom-layer">
                    <h1>{userInfo.full_name}</h1>
                    <br />
                    <span>{userInfo.bio}</span>
                  </div>
                </div>
              </header>
              <div className="links-container">
                <a className="active" href="/ram">
                  Posts
                </a>
                <a href="/ram/saved">Saved</a>
                <a href="/ram/tagged">Tagged</a>
              </div>
              <div>
                {!userData.rows ? null : <Posts rows={userData.rows}></Posts>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userInfo: state.userInfo,
  userData: state.userData,
  userFollowing: state.userFollowing,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
