import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "./components/layout/Sidebar";
import { FiBell, FiSearch } from "react-icons/fi";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Board from "./pages/Board";
import { teamMembers } from "./data/teamMembers";

import AddTaskModal from "./components/modals/AddTaskModal";

import { initialTasks } from "./data/tasks";
import type { Task, TaskStatus } from "./types/task";

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members] = useState(teamMembers);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const editingTask = tasks.find(
  (task) => task.id === editingTaskId
);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const openAddTaskModal = (taskId?: number | null) => {
    if (taskId !== undefined && taskId !== null) {
      setEditingTaskId(taskId);
    } else {
      setEditingTaskId(null);
    }

    if (location.pathname !== "/tasks") {
      navigate("/tasks");
    }

    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            borderRadius: "16px",
            boxShadow: "0 16px 40px rgba(2, 6, 23, 0.35)",
            padding: "12px 14px",
          },
          success: {
            iconTheme: {
              primary: "#a855f7",
              secondary: "#fff",
            },
          },
        }}
      />
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3 text-slate-400" />

            <input
  type="text"
  placeholder="Search tasks..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 w-96 outline-none"
/>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openAddTaskModal()}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-medium"
            >
              + Add Task
            </button>

            <FiBell size={22} />

            <div className="w-10 h-10 rounded-full bg-purple-500"></div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Dashboard tasks={tasks} />
                </PageTransition>
              }
            />

            <Route
              path="/tasks"
              element={
                <PageTransition>
                  <Tasks
                    tasks={tasks}
                    setTasks={setTasks}
                    searchTerm={searchTerm}
                    onEditTask={(id) => openAddTaskModal(id)}
                    onOpenAddTask={() => openAddTaskModal()}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/calendar"
              element={<PageTransition><Calendar /></PageTransition>}
            />
            <Route
              path="/team"
              element={<PageTransition><Team /></PageTransition>}
            />
            <Route
              path="/settings"
              element={<PageTransition><Settings /></PageTransition>}
            />
            <Route
              path="/board"
              element={
                <PageTransition>
                  <Board
                    tasks={tasks}
                    setTasks={setTasks}
                    teamMembers={members}
                  />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>

        <AddTaskModal
  isOpen={isModalOpen}
  editingTask={editingTask ?? null}
  onClose={() => {
    setIsModalOpen(false);
    setEditingTaskId(null);
  }}
  onAddTask={(title: string, category: string, status: string, dueDate: string) => {
    const taskStatus = status as TaskStatus;

    if (editingTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? {
  ...task,
  title,
  category,
  status: taskStatus,
  dueDate,
  priority: task.priority,
  assigneeId: task.assigneeId,
}
            : task
        )
      );

      toast.success("Task updated");
      setEditingTaskId(null);
    } else {
      const newTask: Task = {
  id: Date.now(),
  title,
  category,
  status: taskStatus,
  dueDate,
  priority: "Medium",
  assigneeId: 1,
};

      setTasks((prev) => [...prev, newTask]);
      toast.success("Task created");
    }

    setIsModalOpen(false);
  }}
/>

      </main>
    </div>
  );
}

export default App;