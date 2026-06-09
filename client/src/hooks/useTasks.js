import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from "../api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks(filter);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function addTask(taskData) {
    const newTask = await createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
  }

  async function editTask(id, updates) {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function toggle(id) {
    const updated = await toggleTask(id);
    if (filter !== "all") {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } else {
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    }
  }

  async function remove(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return { tasks, filter, setFilter, loading, error, addTask, editTask, toggle, remove, counts, refetch: fetchTasks };
}
