import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "../Components/AppLayout";
import Authentication from "./authentication";
import ProtectedRoute from "../protectedRoute";

class LandingPage extends React.Component {
  render() {
    let { authorized } = this.props.user;
    return (
      <div>
        {authorized ? (
          <ProtectedRoute
            path="/"
            authorized={authorized}
            {...this.props}
            component={AppLayout}
          ></ProtectedRoute>
        ) : (
          <Authentication />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(LandingPage);
