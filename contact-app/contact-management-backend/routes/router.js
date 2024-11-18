const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/contactSchema'); // Rename schema

const router = express.Router();

// Add Contact
router.post(
    '/api/contacts',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, phone, company, jobTitle } = req.body;

        try {
            const existingContact = await Contact.findOne({ email });
            if (existingContact) {
                return res.status(400).json({ message: 'Contact already exists' });
            }

            const newContact = new Contact({ firstName, lastName, email, phone, company, jobTitle });
            await newContact.save();
            res.status(201).json(newContact);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// Get All Contacts with Pagination and Sorting
router.get('/api/contacts', async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'firstName', order = 'asc' } = req.query;

    try {
        const contacts = await Contact.find()
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Contact.countDocuments();
        res.json({ total, page, limit, contacts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Contact
router.put('/api/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Contact
router.delete('/api/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
