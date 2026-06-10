# Personal Task Manager

A full-stack task management application built with React, Vite, Node.js, and Express.js. The application allows users to create, update, delete, and manage tasks through a modern and responsive user interface with an elegant pink and off-white design.

---

## Features

- Create new tasks with title, description, and due date
- Edit existing tasks inline
- Delete tasks with confirmation prompt
- Mark tasks as completed or incomplete
- Filter tasks by status — All, Active, Completed
- Task count summary dashboard
- Overdue task highlighting
- Empty state UI for each filter
- Loading and error states handled gracefully
- Tasks persist across server restarts
- Responsive modern UI

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS3
- Google Fonts — Playfair Display + Inter

### Backend
- Node.js
- Express.js
- CORS

### Storage
- JSON file (data/tasks.json) — persists tasks across restarts

---

## Project Structure
task-manager/
│
├── client/
│   ├── public/
│   │   └── _redirects
│   └── src/
│       ├── api/
│       │   └── tasks.js
│       ├── components/
│       │   ├── TaskForm.jsx
│       │   ├── TaskList.jsx
│       │   ├── TaskItem.jsx
│       │   └── FilterBar.jsx
│       ├── hooks/
│       │   └── useTasks.js
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── server/
│   ├── routes/
│   │   └── tasks.js
│   ├── data/
│   │   └── tasks.json
│   ├── index.js
│   └── package.json
│
└── README.md

---

## API Endpoints

### Get All Tasks

GET /api/tasks
Optional query: `?status=active` or `?status=completed`

### Create Task
POST /api/tasks
Body: `{ "title": "string", "description": "string", "dueDate": "YYYY-MM-DD" }`

### Update Task
PUT /api/tasks/:id
Body: any of `{ "title", "description", "dueDate", "completed" }`

### Toggle Task Status
PATCH /api/tasks/:id/toggle

### Delete Task
DELETE /api/tasks/:id

---

## Installation

### Clone Repository
git clone https://github.com/Aayush-garg-131/task-manager.git
cd task-manager

### Install Backend Dependencies
cd server
npm install

### Install Frontend Dependencies
cd ../client
npm install

### Run Backend
cd server
npm run dev
Runs on http://localhost:5000

### Run Frontend
cd client
npm run dev
Runs on http://localhost:5173

---

## Deployment

### Frontend
Deployed on Netlify
https://dulcet-tapioca-6a8ec9.netlify.app

### Backend
Deployed on Render
https://task-manager-api-rpiw.onrender.com

Note: The backend is on Render's free tier and may take 30 to 50 seconds to wake up on the first request. Just wait a moment and refresh.

---

## Next Steps

Given more time I would add:

- Search tasks by title
- Drag and drop reordering
- Switch storage from JSON file to SQLite
- Jest and Supertest tests for the API routes
- Priority field with colour coded badges

---

## Author

Aayush Garg
B.Tech Student | Full Stack Development Enthusiast

---

## Learning Resources and References

This project was developed as part of the Studio Graphene Full Stack Developer assessment. During development, I referred to various learning resources including:

- Official React Documentation
- Official Vite Documentation
- Official Express.js Documentation
- Node.js Documentation
- MDN Web Docs

These resources were used to understand concepts, project structure, API development, deployment, and frontend design patterns. The project was implemented, customized, and deployed independently as a hands-on learning exercise. AI tools were used to assist with boilerplate and debugging. All logic is understood and I am prepared to walk through any part of the code in the follow-up interview.