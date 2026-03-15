import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectForm from "./pages/ProjectForm";
import AuthPage from "./pages/AuthPage";
import MyProjects from "./pages/MyProjects";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<ProjectForm />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/myprojects" element={<MyProjects />} />

      </Routes>
              <ToastContainer position="top-right" autoClose={3000} theme="colored" />

    </Router>
  );
}

export default App;