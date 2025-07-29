import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

// Get all todos (render home)
router.get("/", isAuthenticated, getTodos);

// Add a new todo
router.post("/add", isAuthenticated, addTodo);

// Update a todo
router.post("/update/:id", isAuthenticated, updateTodo);

// Delete a todo
router.post("/delete/:id", isAuthenticated, deleteTodo);

export default router; 