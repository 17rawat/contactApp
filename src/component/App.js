import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route } from "react-router-dom";
import api from "../api/contact";

import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import UpdateContact from "./UpdateContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const [searchItem, setSearchItem] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  const addContactHandler = async (contact) => {
    // console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    // console.log(response);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    // console.log(response.data);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchInput) => {
    setSearchItem(searchInput);
    if (searchInput !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <div className="ui container">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              contacts={searchItem.length < 1 ? contacts : searchResults}
              getContactId={removeContactHandler}
              item={searchItem}
              searchKeyWord={searchHandler}
            />
          }
        ></Route>
        <Route
          path="/add"
          element={<AddContact addContactHandler={addContactHandler} />}
        ></Route>

        <Route
          path="/edit"
          element={
            <UpdateContact updateContactHandler={updateContactHandler} />
          }
        ></Route>

        <Route path="/contact/:id" element={<ContactDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
