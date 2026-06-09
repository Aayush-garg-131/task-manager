import TaskItem from "./TaskItem";

function EmptyState({ filter }) {
  const messages = {
    all: { icon: "✦", heading: "No tasks yet", sub: "Add your first task above to get started." },
    active: { icon: "✓", heading: "All caught up!", sub: "You have no active tasks." },
    completed: { icon: "★", heading: "Nothing completed yet", sub: "Finish a task and it will appear here." },
  };
  const { icon, heading, sub } = messages[filter] || messages.all;

  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <h3>{heading}</h3>
      <p>{sub}</p>
    </div>
  );
}

export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) return <EmptyState filter={filter} />;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}