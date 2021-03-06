import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feedActions from "../../Redux/actions/userFeed";
import CustomModal from "../../Utilities/modal";
import CreatePost from "./createPost";
import Post from "./post";
import "./index.css";

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleModal = () => {
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    this.props.user.getFeed();
  }

  render() {
    let { feed, LoggedInUser } = this.props;
    return (
      <div className="feed-container">
        <div className="content">
          <div className="feed-content">
            <div className="create-post">
              <div className="heading">Start a post</div>
              <div>
                <button onClick={this.handleModal}>
                  <i className="fa fa-camera" aria-hidden="true"></i>
                  <span>Photo</span>
                </button>
                <button>
                  <i className="fa fa-video-camera" aria-hidden="true"></i>
                  <span>Video</span>
                </button>
              </div>
              <CustomModal
                comp={<CreatePost {...this.props} toggle={this.handleModal} />}
                open={this.state.show}
                toggle={this.handleModal}
                name="Share your moment"
              />
            </div>
            {feed.data.length
              ? feed.data.map((post, index) => (
                  <Post post={post} user={LoggedInUser} key={index} />
                ))
              : null}
          </div>
          <div className="profile-content">
            <div className="profile">
              <div>
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              </div>
              <div
                style={{
                  marginLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <a href={`/${LoggedInUser.username}`}>
                  {LoggedInUser.username}
                </a>
                <div className="full-name">{LoggedInUser.full_name}</div>
              </div>
            </div>
            <div className="suggestions-container">
              <header>
                <div className="heading">Suggestions For You</div>
                <div>
                  <a href="/explore/people/suggested">see all</a>
                </div>
              </header>
              <div className="suggestions-list">
                <div className="suggestion">
                  <div>
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      width: "70%",
                    }}
                  >
                    <a href={`/${LoggedInUser.username}`}>sundar_pichai</a>
                    <div className="full-name">Followed by rpalitham,rahul</div>
                  </div>
                  <div>
                    <button>Follow</button>
                  </div>
                </div>
                <div className="suggestion">
                  <div>
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      width: "70%",
                    }}
                  >
                    <a href={`/${LoggedInUser.username}`}>mark_zukerberg</a>
                    <div className="full-name">Follows You</div>
                  </div>
                  <div>
                    <button>Follow</button>
                  </div>
                </div>
                <div className="suggestion">
                  <div>
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      width: "70%",
                    }}
                  >
                    <a href={`/${LoggedInUser.username}`}>rana_daggubati</a>
                    <div className="full-name">New to Instagram</div>
                  </div>
                  <div>
                    <button>Follow</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feed: state.userFeed,
  LoggedInUser: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  user: bindActionCreators(feedActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
