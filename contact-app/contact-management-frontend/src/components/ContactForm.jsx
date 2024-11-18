// src/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ onContactAdded, editContact, onEditComplete }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Populate form fields when editing
  useEffect(() => {
    if (editContact) {
      setContact(editContact);
    } else {
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
      });
    }
  }, [editContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (editContact) {
        // Update existing contact
        await axios.put(`http://localhost:5000/api/contacts/${editContact._id}`, contact);
        onEditComplete(contact); // Notify parent about the edit
        setSuccess(true);
      } else {
        // Create a new contact
        const response = await axios.post('http://localhost:5000/api/contacts', contact);
        onContactAdded(response.data); // Notify parent about the new contact
        setSuccess(true);
        setContact({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          jobTitle: '',
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'There was an error saving the contact!');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {editContact ? 'Edit Contact' : 'Add Contact'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          {editContact ? 'Contact updated successfully!' : 'Contact added successfully!'}
        </Alert>
      )}
      <TextField
        name="firstName"
        label="First Name"
        value={contact.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={contact.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={contact.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="email"
      />
      <TextField
        name="phone"
        label="Phone Number"
        value={contact.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="company"
        label="Company"
        value={contact.company}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="jobTitle"
        label="Job Title"
        value={contact.jobTitle}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {editContact ? 'Update Contact' : 'Add Contact'}
      </Button>
    </Box>
  );
};

export default ContactForm;
