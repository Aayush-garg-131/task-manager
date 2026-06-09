import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./App.css";

export default function App() {
  const { tasks, filter, setFilter, loading, error, addTask, editTask, toggle, remove, counts, refetch } = useTasks();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="app-subtitle">Stay on top of your work</p>
      </header>
      <main className="app-main">
        <TaskForm onAdd={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
        {error && (
          <div className="error-banner">
            <span>Could not load tasks: {error}</span>
            <button className="btn btn-ghost btn-sm" onClick={refetch}>Retry</button>
          </div>
        )}
        {loading && !error && (
          <div className="loading">
            <div className="spinner" />
            <span>Loading tasks...</span>
          </div>
        )}
        {!loading && !error && (
          <TaskList tasks={tasks} filter={filter} onToggle={toggle} onEdit={editTask} onDelete={remove} />
        )}
      </main>
    </div>
  );
}
