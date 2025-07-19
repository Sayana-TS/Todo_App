import Todos from "../model/todoModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  let { title, description, userId } = req.body;

  let newTodo = await Todos.create({
    userId,
    title,
    description,
  });

  res.json(newTodo);
});

const getTodo = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const todos = await Todos.find({ userId: userId });
  res.json(todos);
});

const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const todo = await Todos.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found " });
  }

  res.json(todo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const deleted = await Todos.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Todo not found " });
  }

  res.json({ message: "Todo deleted successfully" });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, isCompleted, id } = req.body;

  const updatedTodo = await Todos.findByIdAndUpdate(
    id,
    { title, description, isCompleted },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found " });
  }

  res.json(updatedTodo);
});

export { createTodo, getTodo, deleteTodo, updateTodo, getTodoById };
