import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useBounce from "../../Utilities/debounce";
import logo from "../../Images/logo.png";
import "./nav.css";

function Nav(props) {
  const [searchText, setSearchText] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const handleLogout = () => {
    props.auth.logout();
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const debounceSearch = useBounce(searchText, 400);

  useEffect(() => {
    if (debounceSearch) {
      props.user.search(debounceSearch);
    } else {
      setSearchUsers([]);
      let resultsContainer = document.getElementById("search-users");
      if (resultsContainer.classList.contains("visible")) {
        resultsContainer.classList.remove("visible");
      }
    }
  }, [debounceSearch, props.user]);

  useEffect(() => {
    let { data } = props.userSearch;
    let resultsContainer = document.getElementById("search-users");
    if (data.length) {
      setSearchUsers(data);
      if (!resultsContainer.classList.contains("visible")) {
        resultsContainer.classList.toggle("visible");
      }
    } else {
      setSearchUsers([]);
      if (resultsContainer.classList.contains("visible")) {
        resultsContainer.classList.remove("visible");
      }
    }
  }, [props.userSearch]);

  const handleProfile = () => {
    let { username } = props.loggedUser;
    props.history.push(`/${username}`);
    window.location.reload();
  };

  const handleBlur = (e) => {
    if (e.relatedTarget) {
      let ele = e.relatedTarget;
      if (ele.hasAttribute("href")) {
        ele.click();
        window.location.reload();
      }
    }
    let openDropdown = document.getElementById("search-users");
    if (openDropdown.classList.contains("visible")) {
      openDropdown.classList.remove("visible");
    }
  };

  const handleFocus = () => {
    let openDropdown = document.getElementById("search-users");
    if (!openDropdown.classList.contains("visible") && searchUsers.length) {
      openDropdown.classList.toggle("visible");
    }
  };

  return (
    <div className="nav">
      <div className="nav-container">
        <div>
          <img
            style={{ cursor: "pointer" }}
            src={logo}
            alt="logo"
            onClick={() => props.history.push("/")}
          ></img>
        </div>
        <div className="instant-search">
          <div className="instant-search-input-container">
            <input
              className="instant-search-input"
              type="text"
              name="search"
              placeholder="search"
              autoComplete="off"
              value={searchText}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </div>

          <div id="search-users" className="instant-search-results-container">
            {searchUsers.length
              ? searchUsers.map((user, index) => {
                  return (
                    <Link
                      to={`/${user.username}`}
                      className="instant-search-result"
                      key={`link-${index}`}
                    >
                      <div>
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                        ></i>
                        <label>{user.username}</label>
                      </div>
                    </Link>
                  );
                })
              : null}
          </div>
        </div>
        <div className="icons-container">
          <i
            className="fa fa-home"
            aria-hidden="true"
            onClick={() => {
              props.history.push("/");
            }}
          ></i>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          <i className="fa fa-compass" aria-hidden="true"></i>
          <i
            className="fa fa-heart"
            onClick={(e) => handleLogout(e)}
            aria-hidden="true"
          ></i>
          <i
            className="fa fa-user-circle-o"
            onClick={(e) => handleProfile()}
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Nav;
