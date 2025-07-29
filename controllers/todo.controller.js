import { Todo } from "../models/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Get all todos for the authenticated user
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.render("home", {
    username: req.user.username,
    fullName: req.user.fullName,
    email: req.user.email,
    todos,
  });
});

// Add a new todo
export const addTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;
  if (!todo || !todo.trim()) {
    throw new ApiError(400, "Todo text is required");
  }
  await Todo.create({ text: todo.trim(), user: req.user._id });
  res.redirect("/");
});

// Update a todo
export const updateTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;
  const { id } = req.params;
  if (!todo || !todo.trim()) {
    throw new ApiError(400, "Todo text is required");
  }
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { $set: { text: todo.trim() } },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );
  if (!updatedTodo) throw new ApiError(404, "Todo not found");
  res.redirect("/");
});

// Delete a todo
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
  if (!deleted) throw new ApiError(404, "Todo not found");
  res.redirect("/");
}); 