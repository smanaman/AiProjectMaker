import { useState } from "react";
import { toast } from "react-toastify";

function Form() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    level: "",
    frontend: "", // Single Choice
    backend: "",  // Single Choice
    database: "", // Single Choice
    pages: [],    // Multiple Choice (Tags)
    features: [], // Multiple Choice (Tags)
  });

  // Options Lists
  const frontendList = ["React", "Vue.js", "Next.js", "Angular", "HTML/CSS"];
  const backendList = ["Node.js", "Python", "PHP", "ASP.NET", "Java"];
  const databaseList = ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "SQLite"];
  const pagesList = ["Home", "Login", "Signup", "Dashboard", "Cart", "Checkout", "Profile", "Settings", "Contact", "About"];
  const featuresList = ["JWT Auth", "Payment API", "Live Chat", "Email", "Search", "Admin Panel", "Dark Mode", "Analytics"];
  const projectTypes = ["E-commerce", "Social Media", "SaaS", "LMS Portal", "Portfolio", "Blog"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle Function for Multiple Selection (Tags)
  const toggleTag = (field, value) => {
    const currentArray = formData[field];
    if (currentArray.includes(value)) {
      setFormData({ ...formData, [field]: currentArray.filter((item) => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...currentArray, value] });
    }
  };


  const [loading, setLoading] = useState(false);
  // NEW STATE FOR MODAL
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const token = localStorage.getItem("token");

      const formDataObj = new FormData();

      formDataObj.append("projectName", formData.projectName);
      formDataObj.append("projectType", formData.projectType);
      formDataObj.append("level", formData.level);
      formDataObj.append("frontend", formData.frontend);
      formDataObj.append("backend", formData.backend);
      formDataObj.append("database", formData.database);
      formDataObj.append("pages", JSON.stringify(formData.pages));
      formDataObj.append("features", JSON.stringify(formData.features));

      const res = await fetch("http://localhost:5000/api/create", {

        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: formDataObj

      });

      const data = await res.json();

      if (data.success) {
        toast.success("Project Generated Successfully 🚀");
        setResult(data);        // SAVE RESPONSE
        setShowModal(true);
      } else {
        toast.error("Project generation failed ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while generating the project ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container shadow-lg bg-white rounded-4 overflow-hidden p-0 mt-5">
        {/* Header Section */}
        <div className="bg-primary p-4 text-white text-center">
          <h2 className="fw-bold mb-0">🛠️ Project Architect</h2>
          <p className="mb-0 opacity-75">Design your full-stack roadmap in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 p-md-5">
          <div className="row g-4">

            {/* --- SECTION 1: BASIC INFO --- */}
            <div className="col-md-4">
              <label className="form-label fw-bold">Project Name</label>
              <input type="text" name="projectName" className="form-control" placeholder="e.g. Uber Clone" value={formData.projectName} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Category</label>
              <select name="projectType" className="form-select" value={formData.projectType} onChange={handleChange} required >
                <option value="">Select Category</option>
                {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Complexity</label>
              <select name="level" className="form-select" value={formData.level} onChange={handleChange} required>
                <option value="">Select Level</option>
                <option value="beginner">Beginner (MVP)</option>
                <option value="intermediate">Intermediate (Standard)</option>
                <option value="advanced">Advanced (Enterprise)</option>
              </select>
            </div>

            {/* --- SECTION 2: TECH STACK (SINGLE CHOICE) --- */}
            <div className="col-12 mt-5">
              <h5 className="text-secondary fw-bold mb-3 border-start border-4 border-primary ps-2">Select Tech Stack (Single Choice Only)</h5>
            </div>

            {/* Frontend Selection */}
            <div className="col-lg-4 col-md-6">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <label className="d-block fw-bold mb-3 text-info">Frontend Framework</label>
                {frontendList.map((item) => (
                  <div key={item} className="mb-2">
                    <input
                      type="radio" className="btn-check" name="frontend" id={`fe-${item}`} value={item}
                      onChange={handleChange} checked={formData.frontend === item}
                    />
                    <label className="btn btn-outline-info w-100 text-start py-2" htmlFor={`fe-${item}`}>
                      {item} {formData.frontend === item && "✅"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Selection */}
            <div className="col-lg-4 col-md-6">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <label className="d-block fw-bold mb-3 text-success">Backend Core</label>
                {backendList.map((item) => (
                  <div key={item} className="mb-2">
                    <input
                      type="radio" className="btn-check" name="backend" id={`be-${item}`} value={item}
                      onChange={handleChange} checked={formData.backend === item}
                    />
                    <label className="btn btn-outline-success w-100 text-start py-2" htmlFor={`be-${item}`}>
                      {item} {formData.backend === item && "✅"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Database Selection */}
            <div className="col-lg-4 col-md-12">
              <div className="p-3 border rounded bg-white shadow-sm h-100">
                <label className="d-block fw-bold mb-3 text-danger">Database</label>
                {databaseList.map((item) => (
                  <div key={item} className="mb-2">
                    <input
                      type="radio" className="btn-check" name="database" id={`db-${item}`} value={item}
                      onChange={handleChange} checked={formData.database === item}
                    />
                    <label className="btn btn-outline-danger w-100 text-start py-2" htmlFor={`db-${item}`}>
                      {item} {formData.database === item && "✅"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* --- SECTION 3: PAGES & FEATURES (MULTI SELECT TAGS) --- */}
            <div className="col-md-6 mt-5">
              <h5 className="text-secondary fw-bold mb-3 border-start border-4 border-warning ps-2">Select Pages (Multiple)</h5>
              <div className="d-flex flex-wrap gap-2 p-3 border rounded bg-light">
                {pagesList.map(page => (
                  <button
                    key={page} type="button"
                    onClick={() => toggleTag("pages", page)}
                    className={`btn btn-sm rounded-pill px-3 py-2 transition-all ${formData.pages.includes(page) ? "btn-warning shadow" : "btn-outline-secondary bg-white"}`}
                  >
                    {page} {formData.pages.includes(page) ? "✕" : "+"}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-md-6 mt-5">
              <h5 className="text-secondary fw-bold mb-3 border-start border-4 border-primary ps-2">Features Included (Multiple)</h5>
              <div className="d-flex flex-wrap gap-2 p-3 border rounded bg-light">
                {featuresList.map(f => (
                  <button
                    key={f} type="button"
                    onClick={() => toggleTag("features", f)}
                    className={`btn btn-sm rounded-pill px-3 py-2 transition-all ${formData.features.includes(f) ? "btn-primary shadow" : "btn-outline-secondary bg-white"}`}
                  >
                    {f} {formData.features.includes(f) ? "✕" : "+"}
                  </button>
                ))}
              </div>
            </div>



            {/* SUBMIT BUTTON */}
            <div className="col-12 text-center mt-5 mb-3">
              <button disabled={loading} type="submit" className="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg">

                {loading ? "Generating..." : "Create Project Architecture →"}
              </button>
            </div>

          </div>
        </form>
        {/* RESULT MODAL */}
        {showModal && (
          <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Project Generated 🎉</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">

                  <p><b>Download your generated project:</b></p>

                  {/* DOWNLOAD BUTTON */}
                  {result?.downloadLink && (
                    <a
                      href={result.downloadLink}
                      className="btn btn-success"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download Project ZIP
                    </a>
                  )}

                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Form;