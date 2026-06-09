import { useState } from "react";

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date().toISOString().split("T")[0];
  return task.dueDate < today;
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  async function handleSave() {
    if (!editTitle.trim()) { setEditError("Title cannot be empty"); return; }
    setSaving(true);
    setEditError("");
    try {
      await onEdit(task.id, { title: editTitle, description: editDescription, dueDate: editDueDate || null });
      setEditing(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || "");
    setEditError("");
    setEditing(false);
  }

  async function handleDelete() {
    if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
      await onDelete(task.id);
    }
  }

  const overdue = isOverdue(task);

  return (
    <div className={`task-item ${task.completed ? "completed" : ""} ${overdue ? "overdue" : ""}`}>
      <div className="task-main">
        <input type="checkbox" className="task-checkbox" checked={task.completed}
          onChange={() => onToggle(task.id)} />
        {editing ? (
          <div className="task-edit-form">
            {editError && <p className="form-error">{editError}</p>}
            <input className="input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title" disabled={saving} autoFocus />
            <textarea className="input textarea" value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description" rows={2} disabled={saving} />
            <div className="form-row">
              <div className="form-group">
                <label className="input-label">Due date</label>
                <input type="date" className="input" value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)} disabled={saving} />
              </div>
              <div className="edit-actions">
                <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={handleCancel} disabled={saving}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="task-content">
            <span className="task-title">{task.title}</span>
            {task.description && <span className="task-description">{task.description}</span>}
            {task.dueDate && (
              <span className={`task-due ${overdue ? "overdue-text" : ""}`}>
                {overdue ? "Overdue: " : "Due "}{formatDate(task.dueDate)}
              </span>
            )}
          </div>
        )}
      </div>
      {!editing && (
        <div className="task-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
