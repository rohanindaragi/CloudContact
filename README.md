# CloudContact
## Setup Instructions
### Backend Setup

1. Navigate to the backend directory:
   cd contact-management-backend

2. Install dependencies:
    npm install

3. Set up the .env file:
   MONGO_URI=mongodb://localhost:27017/Contact_app

4. Start the server:
   node server.js

### Frontend Setup

1. Navigate to the frontend directory:
   cd contact-management-frontend

2. Install dependencies:
    npm install

3. Start the development server:
    npm run dev

## Project Description

This is a full-stack Contact Management App where users can:

    Add, edit, delete, and view contacts.
    Sort and paginate the contact list for better usability.

## Major Technical Decisions

    MongoDB: Used for its schema-less design and scalability.
    Material-UI: Selected for modern and responsive UI components.
    Server-Side Pagination: Ensures performance with large datasets.

## App Functionality
### Frontend:

    ContactForm: Form to add or edit contacts with validation.
    ContactTable: Displays contacts in a table with sorting and pagination.

### Backend:

    Provides RESTful APIs for CRUD operations.
    Validates data and handles errors effectively.
    Interfaces with MongoDB using Mongoose.

### Database:

    Schema includes fields for first name, email, phone, etc., with validation for required fields.

## Challenges and Solutions

### 1. **Implementing Edit Functionality**
**Challenge**: Initially, the `ContactForm` component did not populate with the selected contact's existing data when editing.
**Cause**: The form was not reactive to changes in the `editContact` prop passed from the parent component (`App.jsx`).
**Solution**:
- Used the `useEffect` hook in `ContactForm` to detect changes in the `editContact` prop and update the local state accordingly.
- Ensured the form fields dynamically adjusted based on the selected contact's data.

---

### 2. **Handling Pagination and Sorting**
**Challenge**: Efficiently managing server-side pagination and sorting to handle large datasets without overloading the frontend.
**Cause**: Pagination logic was initially implemented on the client side, causing performance issues for large datasets.
**Solution**:
- Moved pagination and sorting logic to the backend, using MongoDB's `skip` and `limit` functions and dynamic sorting with query parameters.
- Updated the frontend to send page and sort parameters to the backend API.

---

### 3. **Validation and Error Handling**
**Challenge**: Preventing duplicate contacts or invalid data from being saved to the database.
**Cause**: Missing validation in API endpoints and MongoDB schema.
**Solution**:
- Added input validation using `express-validator` for required fields like `First Name` and `Email`.
- Implemented a `unique` constraint for the `email` field in the MongoDB schema.
- Provided meaningful error messages (e.g., "Contact with this email already exists") for better user feedback.

---

### 4. **UI Consistency and Material-UI Integration**
**Challenge**: Achieving a clean, intuitive, and responsive UI while learning and integrating Material-UI components.
**Cause**: Initial unfamiliarity with Material-UI's grid system and component library.
**Solution**:
- Utilized Material-UI documentation and examples to build forms and tables.
- Used Material-UI's `TablePagination`, `TextField`, and `Button` components for a consistent look and feel.

---

### 5. **Connecting Frontend and Backend**
**Challenge**: Ensuring seamless communication between the frontend and backend, particularly when handling CORS errors.
**Cause**: Missing CORS middleware in the backend API.

**Solution**:
- Added the `cors` package and middleware to the backend (`server.js`) to allow cross-origin requests from the frontend.
- Configured the frontend to point to the correct backend API URL.

---

### 6. **Error Feedback in UI**
**Challenge**: Providing clear feedback to users when operations like adding or editing a contact failed.
**Cause**: Errors returned by the API were not being displayed in the UI.

**Solution**:
- Updated the `ContactForm` component to display error messages using Material-UI's `Alert` component.
- Used `try-catch` blocks in the API calls to capture and handle errors.

---

### 7. **Time Management**
**Challenge**: Balancing between meeting all requirements and ensuring code quality within a limited time.

**Solution**:
- Followed an iterative development approach:
  - Focused on core functionality (CRUD operations) first.
  - Gradually improved UI and added advanced features like pagination and sorting.
  - Refactored code for readability and maintainability towards the end.
