import React from "react";
import { Github, Twitter, Linkedin, Cpu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row gy-4">

          {/* Logo & Text */}
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Cpu size={32} className="text-primary" />
              <h4 className="fw-bold mb-0">AI Project Maker</h4>
            </div>
            <p className="text-secondary">
              The world's first automated software architect.
            </p>
          </div>

          {/* Socials */}
          <div className="col-md-6 text-md-end">
            <h5 className="fw-bold mb-3">Socials</h5>
            <div className="d-flex justify-content-md-end gap-3">
              <Github size={24} className="cursor-pointer text-secondary hover-icon" />
              <Twitter size={24} className="cursor-pointer text-secondary hover-icon" />
              <Linkedin size={24} className="cursor-pointer text-secondary hover-icon" />
            </div>
          </div>

        </div>

        <hr className="border-secondary mt-4" />

        <div className="text-center text-secondary small">
          © 2026 AI Project Maker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;