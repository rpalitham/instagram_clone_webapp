import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../Redux/actions/login";
import logo from "../Images/logo.png";
import screenshot1 from "../Images/screenshot1.jpg";
import screenshot2 from "../Images/screenshot2.jpg";
import screenshot3 from "../Images/screenshot3.jpg";
import screenshot4 from "../Images/screenshot4.jpg";
import screenshot5 from "../Images/screenshot5.jpg";
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

  imageReload = () => {
    let img = document.getElementById("show_img");
    let images = [
      screenshot1,
      screenshot2,
      screenshot3,
      screenshot4,
      screenshot5,
    ];
    let count = 0;
    setInterval(() => {
      console.log("set interval");
      if (count >= images.length) count = 0;
      img.src = images[count];
      img.alt = "show";
      count++;
    }, 3000);
  };

  componentDidMount() {
    this.imageReload();
  }

  render() {
    let { email, password, loading } = this.state;
    return (
      <section className="authentication-container">
        <main className="main-content">
          <article>
            <div className="left-container">
              <div className="images">
                <img id="show_img" src={screenshot1} alt="show"></img>
              </div>
            </div>
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
