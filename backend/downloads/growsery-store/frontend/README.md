# Growsery Store - Full Stack Project

This is a complete full-stack e-commerce project for a growsery store, built with React for the frontend, Node.js/Express for the backend, and MongoDB for the database. It includes user authentication with JWT, a modern UI, and responsive design.

## Features

-   **User Authentication:** Register, Login, and User Profile management using JWT.
-   **Product Management:** View products, (Admin only: create, update, delete products).
-   **Search Functionality:** Filter products.
-   **Shopping Cart:** (Placeholder functionality).
-   **Checkout Process:** (Placeholder functionality).
-   **Dark Mode:** Toggle between light and dark themes.
-   **Modern UI:** Built with Tailwind CSS, responsive design.
-   **Protected Routes:** Restricted access to certain pages/APIs based on user roles (e.g., admin).

## Frontend Packages

-   `react`: A JavaScript library for building user interfaces.
-   `react-dom`: This package serves as the entry point to the DOM and server renderers for React.
-   `react-router-dom`: DOM bindings for React Router.
-   `axios`: Promise based HTTP client for the browser and node.js.
-   `vite`: Next Generation Frontend Tooling.
-   `tailwindcss`: A utility-first CSS framework for rapidly building custom designs.
-   `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
-   `postcss`: A tool for transforming CSS with JavaScript.

## Backend Packages

-   `express`: Fast, unopinionated, minimalist web framework for Node.js.
-   `mongoose`: MongoDB object modeling for Node.js.
-   `cors`: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   `dotenv`: Loads environment variables from a `.env` file into `process.env`.
-   `jsonwebtoken`: An implementation of JSON Web Tokens for Node.js.
-   `bcryptjs`: A library to help you hash passwords.
-   `express-async-handler`: Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
-   `nodemon`: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected (development dependency).

## Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   MongoDB Atlas account or local MongoDB instance

### Backend Setup

1.  Navigate into the `backend` directory:
    bash
    cd backend
    
2.  Install backend dependencies:
    bash
    npm install
    
3.  Create a `.env` file in the `backend` directory and add your environment variables:
    env
    PORT=5000
    MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
    JWT_SECRET=YOUR_JWT_SECRET_KEY
    
    *Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB connection string (e.g., from MongoDB Atlas).* 
    *Replace `YOUR_JWT_SECRET_KEY` with a strong, random string.*
4.  Start the backend server:
    bash
    npm start
    # or for development with nodemon:
    # npm run dev
    
    The backend server will run on `http://localhost:5000` (or your specified PORT).

### Frontend Setup

1.  Navigate into the `frontend` directory:
    bash
    cd frontend
    
2.  Install frontend dependencies:
    bash
    npm install
    
3.  Start the frontend development server:
    bash
    npm run dev
    
    The frontend application will typically run on `http://localhost:5173` (or another port as indicated by Vite).

## Usage

1.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Register a new user or log in with existing credentials.
3.  Explore the products, toggle dark mode, and navigate through the different pages.
4.  **Admin Users:** To test admin functionalities, manually update a user's `isAdmin` field to `true` in your MongoDB database after registration.

Enjoy your Growsery Store!
