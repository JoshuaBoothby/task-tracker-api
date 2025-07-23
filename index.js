import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employees.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/employees", employeeRoutes);
app.use("/tasks", taskRoutes);

// HTTPS options
const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/joshua-backend.codex-p4-2025.click/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/joshua-backend.codex-p4-2025.click/fullchain.pem"
  ),
};

// Start HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log("HTTPS server is running on port 443");
});
