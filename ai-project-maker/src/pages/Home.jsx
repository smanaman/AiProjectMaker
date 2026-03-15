import React from 'react'; 
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
    return ( 
        <div>
            <Header />
            <Hero />
            <About />
            <Contact />
            <Footer />
            <ToastContainer />

        </div>
    ); 
}

export default Home;