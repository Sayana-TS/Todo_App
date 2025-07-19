import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const todoRoute = express.Router();

todoRoute.post("/create-todo", protect, createTodo);
todoRoute.get("/getTodos", protect, getTodo);
todoRoute.delete("/:id", protect, deleteTodo);
todoRoute.patch("/update", protect, updateTodo);
todoRoute.get("/getTodoById", protect, getTodoById);

export default todoRoute;
