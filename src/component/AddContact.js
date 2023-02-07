import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact(props) {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");

  const [contact, setContact] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => {
      return {
        ...prevContact,
        [name]: value,
        // name: e.target.value,
        // email: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.name === "" && contact.email === "") {
      alert("All fields are mandatory");
      return;
    }

    props.addContactHandler(contact);
    setContact({ name: "", email: "" });
    navigate("/");

    // console.log(contact);
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={contact.name}
          ></input>
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={contact.email}
          ></input>
        </div>

        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
}
