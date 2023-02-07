import React, { useRef } from "react";
import { Link } from "react-router-dom";

import user from "../images/user.png";

export default function ContactList(props) {
  const searchInput = useRef();

  const getSearchItem = (e) => {
    props.searchKeyWord(searchInput.current.value);
  };

  const renderContactList = props.contacts.map((contact) => {
    const { id, name, email } = contact;
    // console.log(contact);

    return (
      <div key={id} className="item">
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content">
          <Link to={`/contact/${id}`} state={{ contact: contact }}>
            <div className="header">{name}</div>
            <div>{email}</div>
          </Link>
        </div>

        <i
          className="trash alternate outline icon"
          style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
          onClick={() => props.getContactId(id)}
        ></i>

        <Link to={`/edit`} state={{ contact: contact }}>
          <i
            className="edit alternate outline icon"
            style={{ color: "blue", marginTop: "7px" }}
          ></i>
        </Link>
      </div>
    );
  });

  return (
    <div className="main">
      <h1>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h1>

      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={searchInput}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.item}
            onChange={getSearchItem}
          ></input>
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No contact available"}
      </div>
    </div>
  );
}
