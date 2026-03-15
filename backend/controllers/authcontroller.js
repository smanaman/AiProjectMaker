import { generateAIProject } from "../helper/openaiService.js";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { generateProjectPDF } from "../helper/generateprojectpdf.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js";
import Project from "../models/Project.js";


export const createProject = async (req, res) => {
  try {

    const data = req.body;

    const safeParse = (val) => {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed.join(", ") : parsed;
      } catch {
        return val || "Not specified";
      }
    };

    const pages = safeParse(data.pages);
    const features = safeParse(data.features);

    const prompt = `
Generate a COMPLETE production-ready FULL STACK project.

Return ONLY a valid JSON object.

Project Name: ${data.projectName}
Frontend: ${data.frontend}
Backend: ${data.backend}
Database: ${data.database}

Pages: ${pages}
Features: ${features}

IMPORTANT REQUIREMENTS

The generated project MUST be REAL WORLD QUALITY.

Frontend must have modern UI design.
Backend APIs must work correctly.
Frontend must call backend APIs.

Authentication must use JWT.

Database must save data correctly.

User must only run:

npm install

And project should work.

-------------------------------------------------

PROJECT STRUCTURE

{
 "projectName":"${data.projectName.replace(/\s+/g, "-")}",
 "folders":[

  {
   "name":"frontend",
   "files":[
    {"path":"index.html","content":"vite html"},
    {"path":"package.json","content":"vite package"},
    {"path":"vite.config.js","content":"vite config"},

  {"path":"tailwind.config.js","content":"tailwind config"},
  {"path":"postcss.config.js","content":"postcss config"},

    {"path":"README.md","content":"documentation"},

    {"path":"src/main.jsx","content":"react entry"},
    {"path":"src/App.jsx","content":"router setup"},

    {"path":"src/index.css","content":"global css"},

    {"path":"src/api/axios.js","content":"axios setup"},


    {"path":"src/components/Navbar.jsx","content":"navbar"},
    {"path":"src/components/Footer.jsx","content":"footer"},
    {"path":"src/components/Loader.jsx","content":"loader"},


    {"path":"src/pages/Home.jsx","content":"homepage"},
    {"path":"src/pages/Login.jsx","content":"login page"},
    {"path":"src/pages/Register.jsx","content":"register page"},
    {"path":"src/pages/Dashboard.jsx","content":"dashboard page"},
    {"path":"src/pages/About.jsx","content":"about page"}
   ]
  },

  {
   "name":"backend",
   "files":[

    {"path":"package.json","content":"backend package"},
    {"path":".env","content":"env variables"},

    {"path":"server.js","content":"express server"},

    {"path":"config/db.js","content":"mongodb connection"},

    {"path":"models/User.js","content":"mongoose user model"},
    {"path":"models/Post.js","content":"mongoose post model"},

    {"path":"controllers/authController.js","content":"jwt auth controller"},
    {"path":"controllers/postController.js","content":"crud controller"},

    {"path":"routes/authRoutes.js","content":"auth routes"},
    {"path":"routes/postRoutes.js","content":"post routes"},

    {"path":"middleware/authMiddleware.js","content":"jwt middleware"},
    {"path":"middleware/errorMiddleware.js","content":"error handler"}
   ]
  }

 ]
}

-------------------------------------------------

FRONTEND RULES

Frontend must use:

React
Vite
React Router
Axios

UI must be modern and responsive.

Use:

Flexbox
Cards
Buttons
Hero section
Navbar
Footer

IMPORTANT:

Tailwind MUST be fully configured.

The project MUST include:

tailwind.config.js
postcss.config.js

index.css must contain:

@tailwind base;
@tailwind components;
@tailwind utilities;

main.jsx must import:

import "./index.css";

User should NOT need to run:

npx tailwindcss init -p

Pages must call backend APIs.

Login must save JWT token.

-------------------------------------------------

BACKEND RULES

Backend must use:

Node.js
Express
MongoDB
Mongoose
JWT Authentication
bcrypt password hashing

User model must contain:

name
email
password
isAdmin

Auth routes:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

Protected routes must require JWT.
// ADDED: GET API must return example data if database is empty
// This ensures frontend UI always has demo data

Example requirement:

GET /api/posts

If database has no data return example JSON:

[
 {
  "title":"Demo Post 1",
  "description":"Example project data for UI",
  "author":"Admin"
 },
 {
  "title":"Demo Post 2",
  "description":"Sample content for frontend cards",
  "author":"System"
 }
]

Frontend dashboard and homepage must display this data.
-------------------------------------------------

README.md MUST INCLUDE

Project description.

ALL npm packages used in frontend.

ALL npm packages used in backend.

Example:

Frontend Packages

react
react-dom
react-router-dom
axios
vite

Backend Packages

express
mongoose
cors
dotenv
jsonwebtoken
bcryptjs
express-async-handler
nodemon

-------------------------------------------------

INSTALLATION

Frontend

cd frontend
npm install
npm run dev

Backend

cd backend
npm install
node server.js

-------------------------------------------------

IMPORTANT

Return ONLY JSON.

No markdown.

Escape newline with \\n.

`;
    console.log("1. Requesting AI Response...");
    const aiResponse = await generateAIProject(prompt);

    let cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const firstBracket = cleanResponse.indexOf("{");
    const lastBracket = cleanResponse.lastIndexOf("}");

    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error("AI did not return JSON");
    }

    cleanResponse = cleanResponse.substring(firstBracket, lastBracket + 1);

    cleanResponse = cleanResponse
      .replace(/\r/g, "")
      .replace(/\t/g, "")
      .replace(/[\u0000-\u0019]+/g, "")
      .trim();

    let projectData;

    try {

      projectData = JSON.parse(cleanResponse);

    } catch (err) {

      console.log("JSON Parse failed, cleaning characters...");

      let sanitized = cleanResponse;

      // remove newlines
      sanitized = sanitized.replace(/\n/g, "\\n");

      // remove tabs
      sanitized = sanitized.replace(/\t/g, " ");

      // remove backticks
      sanitized = sanitized.replace(/`/g, "");

      // remove trailing commas
      sanitized = sanitized.replace(/,\s*}/g, "}");
      sanitized = sanitized.replace(/,\s*]/g, "]");

      // remove control characters
      sanitized = sanitized.replace(/[\u0000-\u001F]+/g, "");

      try {

        projectData = JSON.parse(sanitized);

      } catch (finalError) {

        console.error("FINAL JSON ERROR:", finalError);

        console.log("BROKEN JSON:", sanitized.substring(0, 2000));

        throw new Error("AI returned invalid JSON");

      }

    }

    const safeProjectName = projectData.projectName.replace(/\s+/g, "-");

    const baseDir = path.join(process.cwd(), "downloads", safeProjectName);

    fs.mkdirSync(baseDir, { recursive: true });

    console.log("2. Creating Folders...");
    createProjectFiles(projectData, baseDir);

    // if (file && file.path) {

    console.log("3. Attempting PDF Generation...");

    try {

      const pdfPath = path.join(baseDir, "documentation.pdf");

      await generateProjectPDF(data, pdfPath);
    } catch (err) {

      console.log("PDF generation skipped:", err.message);

    }
    // }

    console.log("4. Creating ZIP...");

    const zipName = `${safeProjectName}.zip`;
    const zipPath = path.join(baseDir, zipName);

    await createZip(baseDir, zipPath);

    console.log("5. Project Generation Complete!");
    const downloadLink = `https://aiprojectmaker-vcp5.onrender.com/downloads/${safeProjectName}/${zipName}`;
    try {

      await Project.create({

        userId: req.user.id, // coming from JWT middleware

        projectName: data.projectName,
        projectType: data.projectType,
        level: data.level,

        frontend: data.frontend,
        backend: data.backend,
        database: data.database,

        pages: Array.isArray(data.pages) ? data.pages : [pages],
        features: Array.isArray(data.features) ? data.features : [features],

        downloadLink

      });

    } catch (dbErr) {

      console.log("Project history save failed:", dbErr.message);

    }

    res.json({
      success: true,
      message: "Project generated successfully",
      downloadLink
    });

  } catch (error) {

    console.error("CRITICAL ERROR IN CONTROLLER:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });

  }
};

function createProjectFiles(projectData, baseDir) {

  if (!projectData.folders) return;

  projectData.folders.forEach(folder => {

    folder.files.forEach(file => {

      const filePath = path.join(baseDir, folder.name, file.path);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      fs.writeFileSync(filePath, file.content);

    });

  });

}

function createZip(folderPath, zipPath) {

  return new Promise((resolve, reject) => {

    const output = fs.createWriteStream(zipPath);

    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    archive.on("error", reject);

    archive.pipe(output);

    archive.glob("**/*", {
      cwd: folderPath,
      ignore: [path.basename(zipPath)]
    });

    archive.finalize();

  });

}



// REGISTER
export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await User.findById(userId).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


export const createContact = async (req, res) => {
  try {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: newContact
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET USER PROJECT HISTORY
export const getUserProjects = async (req, res) => {
  try {

    const userId = req.user.id;

    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      totalProjects: projects.length,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Project deleted"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};