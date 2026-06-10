# Task Manager

A full-stack task management app I built as part of the Studio Graphene Full Stack Developer assessment. It lets you create, view, edit, delete, and filter tasks. Nothing fancy — just clean, working CRUD with a React frontend talking to a Node.js backend.

---

## Live Demo

- **Frontend:** https://dulcet-tapioca-6a8ec9.netlify.app
- **Backend:** https://task-manager-api-rpiw.onrender.com

> Note: The backend is hosted on Render's free tier, so it may take 30–50 seconds to wake up on the first request. Just wait a moment and refresh.

---

## Which Exercise I Chose

I went with **Exercise 1: Personal Task Manager**. It felt like the right choice because I wanted to focus on getting the fundamentals solid — clean API design, proper state management, and a UI that actually works — rather than stretching thin across too many features.

---

## Tech Stack

| Layer | What I Used | Why |
|-------|-------------|-----|
| Backend | Node.js + Express | Simple to set up, great for REST APIs |
| Frontend | React + Vite | Fast dev experience, hooks-based components |
| Storage | JSON file | Keeps things simple without needing a DB |
| Styling | Plain CSS | Full control, no extra dependencies |
| Fonts | Playfair Display + Inter | Clean and professional look |

---

## How to Run Locally

You'll need Node.js 18+ installed. That's it.

```bash
# Clone the repo
git clone https://github.com/Aayush-garg-131/task-manager.git
cd task-manager

# Start the backend
cd server
npm install
npm run dev
# Runs on http://localhost:5000

# Open a new terminal, start the frontend
cd ../client
npm install
npm run dev
# Runs on http://localhost:5173
```

Open http://localhost:5173 in your browser and you're good to go.

---

## API Documentation

Base URL: `http://localhost:5000/api`

### GET /tasks
Get all tasks, sorted newest first.

Optional query: `?status=active` or `?status=completed`

```json
[
  {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk and eggs",
    "dueDate": "2026-06-15",
    "completed": false,
    "createdAt": 1717800000000
  }
]
```

### POST /tasks
Create a new task.

```json
// Request body
{ "title": "string (required)", "description": "string", "dueDate": "YYYY-MM-DD" }

// Response: 201 with created task
```

### PUT /tasks/:id
Update any field on a task. Send only what you want to change.

```json
// Request body — any of these
{ "title": "updated title", "description": "...", "dueDate": "...", "completed": true }

// Response: 200 with updated task
```

### PATCH /tasks/:id/toggle
Flip the completed status.

```json
// Response: 200 with updated task
```

### DELETE /tasks/:id
Delete a task.

```json
// Response: 200
{ "message": "Task deleted", "task": { ... } }
```

---

## Project Structure

task-manager/
├── server/
│   ├── index.js              # Express setup, middleware, error handling
│   ├── routes/
│   │   └── tasks.js          # All 5 API endpoints
│   └── data/
│       └── tasks.json        # Where tasks are saved (auto-created)
│
├── client/
│   └── src/
│       ├── api/
│       │   └── tasks.js      # All fetch() calls live here only
│       ├── hooks/
│       │   └── useTasks.js   # Custom hook — all task state in one place
│       ├── components/
│       │   ├── TaskForm.jsx  # Add new task form
│       │   ├── FilterBar.jsx # All / Active / Completed tabs
│       │   ├── TaskList.jsx  # Task list + empty states
│       │   └── TaskItem.jsx  # Single task with edit, toggle, delete
│       ├── App.jsx           # Root component
│       └── App.css           # All styles
│
└── README.md

---

## What Works

- Add a task with title (required), description, and due date
- View all tasks sorted newest first
- Mark tasks complete or incomplete with a checkbox
- Inline edit — click Edit on any task to update it in place
- Delete with a confirmation prompt so you don't accidentally lose something
- Filter by All, Active, Completed with live counts
- Overdue tasks get a red left border and a warning label
- Empty state message changes based on which filter you're on
- Loading spinner while the API call is in flight
- Error banner with a Retry button if the backend is unreachable
- Tasks saved to a JSON file so they survive server restarts
- Responsive on mobile

---

## What I Would Do Next

Ran out of time on a few things I had in mind:

- **Search by title** — a search bar on the frontend with a `?search=` query param on the backend
- **Drag and drop reordering** — I looked at `@dnd-kit/core` but didn't want to rush it
- **SQLite instead of JSON** — the JSON file works fine but SQLite would be more robust for concurrent writes
- **Tests** — I would write a couple of Jest tests for the API routes, at least the happy path and the 404 case
- **Priority field** — Low / Medium / High with colour-coded badges would make the app more useful

---

## Honest Notes

- I used Claude (AI) to help with boilerplate, the CSS styling, and to debug a PowerShell encoding issue that was corrupting my JSX files. All the logic and structure is mine and I understand every line — happy to walk through any part of it in the interview.
- The backend sleeps on Render's free tier. First load might be slow. That's a hosting limitation, not a bug.