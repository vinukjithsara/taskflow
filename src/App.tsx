import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import { FiBell, FiSearch } from "react-icons/fi";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Team from "./pages/Team";
import Settings from "./pages/Settings";

import AddTaskModal from "./components/modals/AddTaskModal";

import { initialTasks } from "./data/tasks";
import type { Task } from "./types/task";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3 text-slate-400" />

            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 w-96 outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-medium"
            >
              + Add Task
            </button>

            <FiBell size={22} />

            <div className="w-10 h-10 rounded-full bg-purple-500"></div>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={<Dashboard tasks={tasks} />}
          />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <AddTaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onAddTask={(title, category, status) => {
    const newTask = {
      id: Date.now(),
      title,
      category,
      status,
    };

    setTasks((prev) => [...prev, newTask]);

    setIsModalOpen(false);
  }}
/>
      </main>
    </div>
  );
}

export default App;