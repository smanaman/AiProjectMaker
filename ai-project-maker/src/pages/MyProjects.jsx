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

      // FIX: delay redirect
      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }


      const res = await axios.get("http://localhost:5000/api/myprojects", {
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

  const openModal = (project) => {   // NEW
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {  // NEW
    setShowModal(false);
  };

  return (

    <>
      <Header />

      <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>

        {/* HERO */}
        <div className="bg-dark text-white text-center py-5 mb-4">
          <h1 className="fw-bold">My Generated Projects</h1>
          <p className="text-light">AI Generated Project Library</p>
        </div>

        <div className="container">

          {/* SEARCH */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                placeholder="Search project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* CARDS */}
          <div className="row g-4">

            {filteredProjects.map((project) => (

              <div key={project._id} className="col-md-6 col-lg-4">

                <div className="card border-0 shadow-lg h-100">

                  <div className="card-body">

                    <h5 className="fw-bold">{project.projectName}</h5>

                    <p className="text-muted mb-2">
                      {project.projectType} • {project.level}
                    </p>

                    <p className="mb-1">
                      <strong>Frontend:</strong> {project.frontend}
                    </p>

                    <p className="mb-3">
                      <strong>Backend:</strong> {project.backend}
                    </p>

                  </div>

                  <div className="card-footer bg-white border-0 d-flex justify-content-between">

                    {/* VIEW BUTTON */}
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => openModal(project)}
                    >
                      👁 View
                    </button>

                    {/* QUICK DOWNLOAD */}
                    <a
                      href={project.downloadLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-dark btn-sm"
                    >
                      Download
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center mt-5">
              <p className="text-muted">No projects found</p>
            </div>
          )}

        </div>

      </div>

      {/* MODAL */}
      {showModal && selectedProject && (

        <div className="modal show fade d-block" tabIndex="-1">

          <div className="modal-dialog modal-lg">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title fw-bold">
                  {selectedProject.projectName}
                </h5>

                <button
                  className="btn-close"
                  onClick={closeModal}
                ></button>

              </div>

              <div className="modal-body">

                <p><strong>Project Type:</strong> {selectedProject.projectType}</p>
                <p><strong>Level:</strong> {selectedProject.level}</p>
                <p><strong>Frontend:</strong> {selectedProject.frontend}</p>
                <p><strong>Backend:</strong> {selectedProject.backend}</p>

                {/* PAGES */}
                <div className="mb-3">
                  <strong>Pages</strong>
                  <div className="mt-2">
                    {selectedProject.pages.map((p, i) => (
                      <span key={i} className="badge bg-primary me-2 mb-2">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FEATURES */}
                <div className="mb-3">
                  <strong>Features</strong>
                  <div className="mt-2">
                    {selectedProject.features.map((f, i) => (
                      <span key={i} className="badge bg-success me-2 mb-2">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              <div className="modal-footer">

                <a
                  href={selectedProject.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark"
                >
                  Download Project
                </a>

                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>

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