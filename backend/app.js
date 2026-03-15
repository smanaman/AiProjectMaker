// app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/auth.js";
import path from "path";
import db from "./config/db.js";

dotenv.config();
const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/downloads", express.static(path.join(process.cwd(), "downloads")));
// routes
app.use("/api", projectRoutes);


// server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
}); 