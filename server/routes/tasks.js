const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

router.get("/", (req, res) => {
  const { status } = req.query;
  let tasks = readTasks();
  if (status === "active") tasks = tasks.filter((t) => !t.completed);
  else if (status === "completed") tasks = tasks.filter((t) => t.completed);
  tasks.sort((a, b) => b.createdAt - a.createdAt);
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description = "", dueDate = null } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
    dueDate,
    completed: false,
    createdAt: Date.now(),
  };
  const tasks = readTasks();
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const { title, description, dueDate, completed } = req.body;
  if (title !== undefined) {
    if (title.trim() === "") return res.status(400).json({ error: "Title cannot be empty" });
    tasks[index].title = title.trim();
  }
  if (description !== undefined) tasks[index].description = description.trim();
  if (dueDate !== undefined) tasks[index].dueDate = dueDate;
  if (completed !== undefined) tasks[index].completed = completed;
  writeTasks(tasks);
  res.json(tasks[index]);
});

router.patch("/:id/toggle", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks[index].completed = !tasks[index].completed;
  writeTasks(tasks);
  res.json(tasks[index]);
});

router.delete("/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(index, 1)[0];
  writeTasks(tasks);
  res.json({ message: "Task deleted", task: deleted });
});

module.exports = router;
