import express from "express";
import {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
  getTaskById, // <-- Add this import
} from "../controllers/controller_tasks.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", addNewTask);
router.get("/:id", getTaskById); // <-- Add this line
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
