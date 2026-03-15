import React from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProjectForm() {
    return ( 
        <div>
            <Header />
            <Form/>
            <Footer />
            <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
        </div>
    ); 
}

export default ProjectForm;