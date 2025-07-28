import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employees.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Public auth routes (no auth required)
app.use("/api", authRoutes);

// Apply JWT middleware to all task tracker routes
app.use("/employees", authenticateToken, employeeRoutes);
app.use("/tasks", authenticateToken, taskRoutes);

const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/joshua-backend.codex-p4-2025.click/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/joshua-backend.codex-p4-2025.click/fullchain.pem"
  ),
};

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS server is running on port 443");
});
