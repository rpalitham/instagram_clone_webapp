import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "../Components/AppLayout";
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
          <div style={{ textAlign: "center" }}>
            <Link to="/auth/login">Login</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(LandingPage);
