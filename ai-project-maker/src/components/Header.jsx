import { Cpu, LogOut, User, Folder } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("https://aiprojectmaker-vcp5.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [token]);

  const handleStart = () => {
    if (!token || token === "null" || token === "undefined") {
      toast.error("Please login first 🔐");
      return;
    }

    navigate("/form");
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm fixed-top">
      <div className="container px-3">

        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
          style={{ fontSize: "20px" }}
        >
          <Cpu size={28} color="#6366f1" />
          <span
            style={{
              background: "linear-gradient(90deg,#6366f1,#9333ea)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "700",
            }}
          >
            AI Project Maker
          </span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navMenu">

          {/* NAV LINKS */}
          <ul className="navbar-nav mx-auto gap-lg-3 text-center text-lg-start">

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#contact">
                Contact
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/myprojects">
                My Projects
              </Link>
            </li>

          </ul>

          {/* RIGHT SIDE */}
          {!token ? (

            <div className="d-flex justify-content-center justify-content-lg-end">
              <button
                className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>

          ) : (

            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">

              {/* START BUTTON */}
              <button
                className="btn btn-primary rounded-pill px-4 fw-semibold"
                onClick={handleStart}
                style={{
                  background: "linear-gradient(90deg,#6366f1,#9333ea)",
                  border: "none",
                }}
              >
                Get Started
              </button>

              {/* USER AVATAR */}
              <div style={{ position: "relative" }}>

                <div
                  onClick={() => setOpen(!open)}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#6366f1,#9333ea)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                {open && (
                  <div
                    className="card shadow"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "55px",
                      width: "220px",
                      borderRadius: "12px",
                      border: "none",
                      zIndex: 999,
                    }}
                  >
                    <div className="card-body">

                      <p className="fw-bold mb-2">
                        {user?.name}
                      </p>

                      <hr />

                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => navigate("/myprojects")}
                      >
                        <Folder size={16} />
                        My Projects
                      </button>

                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => navigate("/profile")}
                      >
                        <User size={16} />
                        Profile
                      </button>

                      <hr />

                      <button
                        className="dropdown-item text-danger d-flex align-items-center gap-2"
                        onClick={logout}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>

                    </div>
                  </div>
                )}
              </div>

            </div>

          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;