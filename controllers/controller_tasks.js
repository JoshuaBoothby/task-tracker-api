import { pool } from "../cn/db.js";

export const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT t.*, e.name as employee_name 
            FROM tasks t 
            JOIN employee e ON t.employee_id = e.employee_id 
            ORDER BY task_id
        `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addNewTask = async (req, res) => {
  const { description, status, employee_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (description, status, employee_id) VALUES ($1, $2, $3) RETURNING *",
      [description, status, employee_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { description, status, employee_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET description = $1, status = $2, employee_id = $3 WHERE task_id = $4 RETURNING *",
      [description, status, employee_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE task_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
