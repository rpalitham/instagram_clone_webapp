import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import AppLayout from "./Components/AppLayout";

const ProtectedRoute = ({ component: Comp, authorized, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return authorized ? (
          <AppLayout {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
