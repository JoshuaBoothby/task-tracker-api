import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
import employeeRoutes from "./routes/employees.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const enviroment = process.env.NODE_ENV;
let port = 3000

if (enviroment === 'production') {
  port = 443 //ssl
}

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

// Public auth routes (no auth required)
app.use("/api", authRoutes);

// Apply JWT middleware to all task tracker routes
app.use("/employees", authenticateToken, employeeRoutes);
app.use("/tasks", authenticateToken, taskRoutes);

if (enviroment === 'production') {
  const options = {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/joshua-backend.codex-p4-2025.click/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/joshua-backend.codex-p4-2025.click/fullchain.pem"
    ),
  };

  https.createServer(options, app).listen(443, () => {
    console.log(`Running un port ${port}`);
  });
} else {

  app.listen(port, () => {
    console.log(`Running un port ${port}`)
  })

}
