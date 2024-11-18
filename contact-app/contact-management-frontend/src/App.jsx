// src/App.jsx
import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null); // Track contact being edited

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('There was an error fetching the contacts!', error);
    }
  };

  const handleAddContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const handleEditComplete = (updatedContact) => {
    setContacts((prev) =>
      prev.map((contact) => (contact._id === updatedContact._id ? updatedContact : contact))
    );
    setEditContact(null); // Exit edit mode
  };

  const handleEditContact = (contact) => {
    setEditContact(contact); // Enter edit mode with selected contact
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  return (
    <div>
      <ContactForm
        onContactAdded={handleAddContact}
        editContact={editContact}
        onEditComplete={handleEditComplete}
      />
      <ContactTable
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
