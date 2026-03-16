# Toy Shop Full Stack Project

This is a complete full-stack e-commerce project for a toy shop, featuring a React frontend, Node.js/Express backend, and MongoDB for the database. It includes user authentication with JWT, a modern responsive UI with Tailwind CSS, and a dark mode toggle.

## Features

-   **Frontend**: React with Vite, React Router, Axios
-   **Backend**: Node.js with Express, Mongoose
-   **Database**: MongoDB
-   **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` for password hashing
-   **Modern UI**: Tailwind CSS for responsive and aesthetically pleasing design
-   **Dark Mode**: User-toggleable dark mode
-   **User Management**: Register, Login, User Profile access
-   **Product Display**: Fetch and display product-like "posts" from the backend
-   **Error Handling**: Robust error handling on both frontend and backend

## Project Structure


toy-shop/
├── frontend/                # React application
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/                 # Node.js Express API
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   └── postController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    ├── models/
    │   ├── Post.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── postRoutes.js
    ├── .env
    ├── package.json
    └── server.js


## Installation

Follow these steps to set up and run the project.

### 1. Clone the repository

(Assuming this project structure is placed in a `toy-shop` directory)

### 2. Backend Setup

bash
cd backend
npm install


**Create a `.env` file in the `backend/` directory with the following content:**


PORT=5000
MONGO_URI=mongodb://localhost:27017/toyshopdb # Replace with your MongoDB URI if not local
JWT_SECRET=supersecretjwtkey
JWT_EXPIRE=1h


**Run the backend server:**

bash
npm start # Or node server.js


The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup

bash
cd frontend
npm install


**Run the frontend development server:**

bash
npm run dev


The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Technologies Used

### Frontend Packages

-   `react`: JavaScript library for building user interfaces
-   `react-dom`: Entry point for DOM-specific rendering for React
-   `react-router-dom`: Declarative routing for React
-   `axios`: Promise-based HTTP client for the browser and Node.js
-   `vite`: Next generation frontend tooling
-   `tailwindcss`: Utility-first CSS framework for rapidly building custom designs
-   `postcss`: Tool for transforming CSS with JavaScript plugins
-   `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes to CSS rules

### Backend Packages

-   `express`: Fast, unopinionated, minimalist web framework for Node.js
-   `mongoose`: MongoDB object modeling for Node.js
-   `cors`: Node.js middleware for enabling Cross-Origin Resource Sharing
-   `dotenv`: Loads environment variables from a `.env` file
-   `jsonwebtoken`: Implements JSON Web Tokens for authentication
-   `bcryptjs`: A library to help you hash passwords
-   `express-async-handler`: Simple middleware for handling exceptions inside of async express routes
-   `nodemon` (dev dependency): Tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected

## API Endpoints

### Authentication

-   `POST /api/auth/register`: Register a new user (`name`, `email`, `password`)
-   `POST /api/auth/login`: Authenticate a user and get a JWT (`email`, `password`)
-   `GET /api/auth/profile`: Get authenticated user's profile (requires JWT in `Authorization` header)

### Posts (Example Products)

-   `GET /api/posts`: Get all posts. Returns demo data if database is empty.
-   `POST /api/posts`: Create a new post (requires JWT in `Authorization` header)

## Dark Mode

Click the moon/sun icon in the Navbar to toggle between light and dark themes. The preference is stored in your browser's local storage.

## Contributing

Feel free to fork the repository and submit pull requests.

---
**Note**: This project provides a foundational structure. Features like `Cart`, `Checkout`, `Contact`, and advanced `Search` are mentioned in the initial prompt but not fully implemented in this base structure to keep it focused on the core requirements and specified file list.
