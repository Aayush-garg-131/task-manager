export default function FilterBar({ filter, setFilter, counts }) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {tabs.map(({ key, label }) => (
          <button key={key} className={`filter-tab ${filter === key ? "active" : ""}`}
            onClick={() => setFilter(key)}>
            {label}
            <span className="filter-count">{counts[key]}</span>
          </button>
        ))}
      </div>
      <p className="task-summary">{counts.active} active · {counts.completed} completed</p>
    </div>
  );
}