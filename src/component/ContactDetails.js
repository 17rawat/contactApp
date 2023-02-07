import React from "react";
import user from "../images/user.png";
import { Link, useLocation } from "react-router-dom";

export default function ContactDetails(props) {
  const location = useLocation();
  // console.log(location);
  const { name, email } = location.state.contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user"></img>
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>

      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
}
