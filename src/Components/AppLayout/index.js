import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as loginActions from "../../Redux/actions/login";
import * as userSearchActions from "../../Redux/actions/userSearch";
import Nav from "./nav";
import FeedContainer from "../FeedContainer";
import ProfileSection from "../ProfileSection";
import "./index.css";

class AppLayout extends React.Component {
  render() {
    return (
      <section className="app-layout-container">
        <Nav {...this.props} />
        <Switch>
          <Route path="/:user" component={ProfileSection}></Route>
          <Route path="/" component={FeedContainer}></Route>
        </Switch>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUser: state.user,
  userSearch: state.userSearch,
});

const mapDispatchToProps = (dispatch) => ({
  auth: bindActionCreators(loginActions, dispatch),
  user: bindActionCreators(userSearchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
