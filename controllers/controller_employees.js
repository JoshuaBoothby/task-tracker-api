import { pool } from "../cn/db.js";

export const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employee ORDER BY employee_id"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addNewEmployee = async (req, res) => {
  const { name, department, role } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO employee (name, department, role) VALUES ($1, $2, $3) RETURNING *",
      [name, department, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, department, role } = req.body;
  try {
    const result = await pool.query(
      "UPDATE employee SET name = $1, department = $2, role = $3 WHERE employee_id = $4 RETURNING *",
      [name, department, role, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM employee WHERE employee_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
