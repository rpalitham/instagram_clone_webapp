import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../Redux/actions/login";
import Login from "../login";
import Register from "../register";
import "./auth.css";
import logo from "../../Images/logo.png";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

class Auth extends React.Component {
  responseFacebook = (response) => {
    console.log(response);
    // let { login } = this.props.actions;
    // let payload = { ...response, authType: "facebook" };
    // if(response.accessToken.length > 0 ) login(payload)
  };

  render() {
    return (
      <div className="auth-container">
        <div className="brand">
          <img alt="logo" src={logo}></img>
        </div>
        <div className="brand" style={{ margin: "10px" }}>
          <label>Allies</label>
        </div>
        <div className="register-container">
          <FacebookLogin
            appId="1411066522375167"
            fields="name,email,picture"
            callback={this.responseFacebook}
            render={(renderProps) => (
              <button onClick={renderProps.onClick}>
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
                Facebook
              </button>
            )}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <p style={{ marginBottom: "0" }}> - or using email - </p>
        </div>
        <Switch>
          <Route exact path="/auth/register" component={Register}></Route>
          <Route exact path="/auth/login" component={Login}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
