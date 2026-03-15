import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from "react-toastify";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("https://aiprojectmaker-vcp5.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully ✅");
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        toast.error(data.message || "Failed to send message");
      }

    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container py-4 py-md-5">

        {/* HEADER */}
        <div className="text-center mb-4 mb-md-5">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="fw-bold"
            style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}
          >
            Get in Touch
          </motion.h2>

          <p className="text-muted px-2">
            Fill out the form below and we'll get back to you.
          </p>

        </div>

        {/* FORM */}
        <div className="row justify-content-center">

          <div className="col-12 col-md-10 col-lg-8">

            <form onSubmit={handleSubmit}>

              <div className="row g-3 g-md-4">

                {/* NAME */}
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="form-control form-control-lg border-2 shadow-none"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="form-control form-control-lg border-2 shadow-none"
                    required
                  />
                </div>

                {/* MESSAGE */}
                <div className="col-12">
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="form-control form-control-lg border-2 shadow-none"
                    style={{ resize: "none" }}
                    required
                  ></textarea>
                </div>

                {/* BUTTON */}
                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      background: "linear-gradient(90deg,#6366f1,#9333ea)",
                      border: "none"
                    }}
                  >
                    <Send size={18} />
                    Send Message
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