import express from "express";
import { Router } from "express";
import { pool } from "../cn/db.js";
import {
  getAllEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById, // <-- Add this
} from "../controllers/controller_employees.js";

const router = Router();

router.get("/", getAllEmployees);
router.post("/", addNewEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/:id", getEmployeeById); // <-- Add this line

export default router;
