// src/components/ContactTable.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';

const ContactTable = ({ contacts, onEdit, onDelete, onPageChange, onSort }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    onPageChange(0, newRowsPerPage);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => onSort('firstName')}>First Name</TableCell>
            <TableCell onClick={() => onSort('lastName')}>Last Name</TableCell>
            <TableCell onClick={() => onSort('email')}>Email</TableCell>
            <TableCell onClick={() => onSort('phone')}>Phone</TableCell>
            <TableCell onClick={() => onSort('company')}>Company</TableCell>
            <TableCell onClick={() => onSort('jobTitle')}>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(contact)} variant="outlined" color="primary">Edit</Button>
                <Button onClick={() => onDelete(contact._id)} variant="outlined" color="secondary">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ContactTable;
