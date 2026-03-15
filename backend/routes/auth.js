import express from "express";
import { createProject,register,login,getUserProfile,createContact,getUserProjects} from "../controllers/authcontroller.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST project data
router.post("/create",verifyToken, upload.single("file"), createProject);
router.post("/register",register);
router.post("/login",login);
router.get("/profile",verifyToken, getUserProfile);
router.post("/contact", createContact);
router.get("/myprojects",verifyToken, getUserProjects);

export default router;