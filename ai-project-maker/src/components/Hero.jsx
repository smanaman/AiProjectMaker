import React from "react";
import { motion } from "framer-motion";
import { Code, FileText, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const features = [
  { icon: <Code size={22} />, text: "Custom Stack: 20+ languages & frameworks" },
  { icon: <FileText size={22} />, text: "Upload PDFs to guide AI logic" },
  { icon: <CheckCircle size={22} />, text: "Full ready-to-deploy codebase" },
];

const Hero = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first 🔐");
      return;
    }
    navigate("/form");
  };

  return (
    <section className="position-relative overflow-hidden py-5 mt-5 bg-gradient-light">
      
      {/* Floating Gradient Circles */}
      <div className="position-absolute top-0 start-0 translate-middle blur-circle" style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle,#6366f1,#9333ea,transparent)",
        filter: "blur(120px)",
        zIndex: 0
      }}></div>
      <div className="position-absolute bottom-0 end-0 translate-middle blur-circle" style={{
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle,#f43f5e,#fb7185,transparent)",
        filter: "blur(150px)",
        zIndex: 0
      }}></div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center g-5">

          {/* LEFT CONTENT */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <motion.h1
              className="display-4 fw-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Turn Your Ideas into{" "}
              <span className="text-gradient" style={{
                background: "linear-gradient(90deg,#6366f1,#9333ea)",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}>AI-Generated Software</span>{" "}
              Instantly ⚡
            </motion.h1>

            <p className="lead text-secondary mb-5" style={{ lineHeight: 1.7 }}>
              The smartest AI workspace to generate complete full-stack projects.
              Define your tech stack, upload your requirements and let AI create
              source code, file structure and documentation in seconds.
            </p>

            {/* FEATURES LIST */}
            <div className="mb-5">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  className="d-flex align-items-center mb-3 fw-medium text-dark"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                >
                  <span className="text-primary me-3">{item.icon}</span>
                  {item.text}
                </motion.div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="btn btn-lg px-5 py-3 fw-bold rounded-3 shadow-lg text-white"
              style={{
                background: "linear-gradient(90deg,#6366f1,#9333ea)",
                boxShadow: "0 10px 25px rgba(99,102,241,0.4)"
              }}
            >
              <Sparkles className="me-2" />
              Start Building with AI
            </motion.button>
          </motion.div>

          {/* RIGHT CODE BOX */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="glass-box p-4 rounded-4 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                color: "#0ea5e9"
              }}
            >
              {/* Top Code Window Dots */}
              <div className="d-flex gap-2 mb-3">
                <span className="dot" style={{ background: "#f87171" }}></span>
                <span className="dot" style={{ background: "#facc15" }}></span>
                <span className="dot" style={{ background: "#34d399" }}></span>
              </div>

              <pre style={{ fontSize: "14px", overflowX: "auto" }}>
{`// AI Project Generator
const newProject = {
  stack: "MERN Stack",
  features: ["Auth", "Stripe", "Dashboard"],
  status: "Building Code... 🚀"
};

console.log("Success! Files Created.");`}
              </pre>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;