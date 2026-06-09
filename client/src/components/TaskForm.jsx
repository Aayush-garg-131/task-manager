import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required"); return; }
    setSubmitting(true);
    setError("");
    try {
      await onAdd({ title, description, dueDate: dueDate || null });
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <input type="text" placeholder="Task title *" value={title}
          onChange={(e) => setTitle(e.target.value)} className="input" disabled={submitting} />
      </div>
      <div className="form-group">
        <textarea placeholder="Description (optional)" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input textarea" rows={2} disabled={submitting} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="input-label">Due date (optional)</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
            className="input" disabled={submitting} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </form>
  );
}
