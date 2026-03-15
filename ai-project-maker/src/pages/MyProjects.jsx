import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view your projects 🔐");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
        return;
      }

      const res = await axios.get("https://aiprojectmaker-vcp5.onrender.com/api/myprojects", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.projectName.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          padding: 80px 0;
          color: white;
          text-align: center;
          margin-bottom: 40px;
        }
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 15px;
          overflow: hidden;
          border: none;
        }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }
        .search-input {
          border-radius: 30px;
          padding: 12px 25px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s;
        }
        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .badge-custom {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .modal-overlay {
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(5px);
        }
        .download-btn {
          border-radius: 10px;
          padding: 8px 20px;
          font-weight: 600;
        }
      `}</style>

      <div style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: "50px" }}>
        
        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="container">
            <h1 className="display-4 fw-bold mb-3">My Project Library</h1>
            <p className="lead opacity-75">Manage and access all your AI-generated innovations in one place.</p>
          </div>
        </div>

        <div className="container">
          {/* SEARCH */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control search-input shadow-sm"
                placeholder="🔍 Search your projects by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* CARDS */}
          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div key={project._id} className="col-md-6 col-lg-4">
                <div className="card h-100 project-card shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="badge bg-primary-soft text-primary bg-light badge-custom">
                        {project.projectType}
                      </span>
                      <span className={`badge badge-custom ${project.level === 'Advanced' ? 'bg-danger' : 'bg-success'}`}>
                        {project.level}
                      </span>
                    </div>
                    
                    <h4 className="fw-bold mb-3 text-dark">{project.projectName}</h4>

                    <div className="mb-2">
                      <small className="text-muted d-block">Frontend Technology</small>
                      <span className="fw-semibold">💻 {project.frontend}</span>
                    </div>

                    <div className="mb-4">
                      <small className="text-muted d-block">Backend Technology</small>
                      <span className="fw-semibold">⚙️ {project.backend}</span>
                    </div>
                  </div>

                  <div className="card-footer bg-transparent border-0 p-4 pt-0 d-flex gap-2">
                    <button
                      className="btn btn-outline-dark flex-grow-1 download-btn"
                      onClick={() => openModal(project)}
                    >
                      View Details
                    </button>
                    <a
                      href={project.downloadLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary flex-grow-1 download-btn"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProjects.length === 0 && (
            <div className="text-center mt-5 py-5">
              <div className="display-1 mb-3">📁</div>
              <h3 className="text-muted">No projects found</h3>
              <p>Try searching for a different keyword or create a new project!</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedProject && (
        <div className="modal show fade d-block modal-overlay" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "20px" }}>
              <div className="modal-header border-0 p-4 pb-0">
                <h3 className="modal-title fw-bold text-dark">
                  {selectedProject.projectName}
                </h3>
                <button
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <p className="mb-1 text-muted">Project Category</p>
                    <p className="fw-bold">{selectedProject.projectType}</p>
                    
                    <p className="mb-1 text-muted mt-3">Frontend Stack</p>
                    <p className="fw-bold text-primary">{selectedProject.frontend}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1 text-muted">Difficulty Level</p>
                    <p className="fw-bold">{selectedProject.level}</p>

                    <p className="mb-1 text-muted mt-3">Backend Stack</p>
                    <p className="fw-bold text-success">{selectedProject.backend}</p>
                  </div>
                </div>

                <hr className="my-4" />

                {/* PAGES */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Included Pages</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedProject.pages.map((p, i) => (
                      <span key={i} className="badge bg-light text-dark border p-2">
                        📄 {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FEATURES */}
                <div>
                  <h6 className="fw-bold mb-3">Key Features</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedProject.features.map((f, i) => (
                      <span key={i} className="badge bg-success-subtle text-success border border-success p-2 px-3 rounded-pill" style={{backgroundColor: '#e8f5e9'}}>
                        ✅ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0 p-4 pt-0">
                <button className="btn btn-light px-4" onClick={closeModal}>
                  Close
                </button>
                <a
                  href={selectedProject.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary px-4 shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  Download Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyProjects;