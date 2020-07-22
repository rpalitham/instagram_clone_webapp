import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../Redux/actions/login";
import "./Auth/auth.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    let { login } = this.props.actions;
    this.setState({ loading: true });
    login({ email, password });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.authorized !== this.props.user.authorized &&
      this.props.user.authorized
    ) {
      this.setState({ loading: false });
      this.props.history.push("/");
    }
  }

  render() {
    let { email, password, loading } = this.state;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={email}
              name="email"
              autoComplete="off"
              onChange={this.handleChange}
              placeholder="enter email or username"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="password"
              onChange={this.handleChange}
              placeholder="enter password"
              required
            />
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>
              {loading ? (
                <i
                  className="fa fa-circle-o-notch fa-spin"
                  style={{ fontSize: "17px" }}
                ></i>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div style={{ margin: "15px" }}>
          <a href="/auth/forgotpassword" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
        <div>
          <a href="/auth/Register" className="join-now-link">
            New to Allies? Join now
          </a>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
