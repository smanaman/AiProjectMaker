import React, { useState } from 'react'; // FIX
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from "react-toastify"; // FIX

const Contact = () => {

  // FIX: form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // FIX: handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // FIX: submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully ✅"); // FIX
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        toast.error(data.message || "Failed to send message"); // FIX
      }

    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container py-5">
        <div className="text-center mb-5">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="display-6 fw-bold"
          >
            Get in Touch
          </motion.h2>
          <p className="text-muted">Fill out the form below and we'll get back to you.</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-md-8">

            {/* FIX: onSubmit changed */}
            <form onSubmit={handleSubmit}>

              <div className="row g-3">

                <div className="col-md-6">
                  <input
                    type="text"
                    name="name" // FIX
                    value={formData.name} // FIX
                    onChange={handleChange} // FIX
                    placeholder="Full Name"
                    className="form-control form-control-lg border-2 shadow-none"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email" // FIX
                    value={formData.email} // FIX
                    onChange={handleChange} // FIX
                    placeholder="Email Address"
                    className="form-control form-control-lg border-2 shadow-none"
                    required
                  />
                </div>

                <div className="col-12">
                  <textarea
                    rows="4"
                    name="message" // FIX
                    value={formData.message} // FIX
                    onChange={handleChange} // FIX
                    placeholder="Your Message"
                    className="form-control form-control-lg border-2 shadow-none"
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="submit" // FIX
                    className="btn btn-primary btn-lg w-100 fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <Send size={18} /> Send Message
                  </button>
                </div>

              </div>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;