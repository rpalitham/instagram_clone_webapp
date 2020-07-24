import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../Redux/actions/login";
import logo from "../Images/735145cfe0a4.png";
import "./index.css";

class Authentication extends React.Component {
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

  render() {
    let { email, password, loading } = this.state;
    return (
      <section className="authentication-container">
        <main className="main-content">
          <article>
            <div className="left-container"></div>
            <div className="right-container">
              <div className="top">
                <div className="header">
                  <img
                    style={{
                      margin: "10px",
                      width: "145px",
                      cursor: "pointer",
                    }}
                    src={logo}
                    alt="logo"
                  ></img>
                </div>
                <div>
                  <form onSubmit={this.handleSubmit} className="form">
                    <input
                      className="input"
                      type="text"
                      value={email}
                      name="email"
                      autoComplete="off"
                      onChange={this.handleChange}
                      placeholder="enter email or username"
                      required
                    />

                    <input
                      className="input"
                      type="password"
                      value={password}
                      name="password"
                      onChange={this.handleChange}
                      placeholder="enter password"
                      required
                    />

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
                    <div style={{ margin: "10px 40px 18px" }}>
                      <p style={{ marginBottom: "0" }}>
                        {" "}
                        -------- or using email --------{" "}
                      </p>
                    </div>
                  </form>
                  <div style={{ margin: "15px" }}>
                    <a
                      href="/auth/forgotpassword"
                      className="forgot-password-link"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div>
                    <a href="/auth/Register" className="join-now-link">
                      Don't have an account ? signUp
                    </a>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </article>
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
