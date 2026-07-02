import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (
  title: string,
  category: string,
  status: string,
  dueDate: string
) => void;

  editingTask?: {
    title: string;
    category: string;
    status: string;
    dueDate: string;
  } | null;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onAddTask,
  editingTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [status, setStatus] = useState("Backlog");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
  if (editingTask) {
    setTitle(editingTask.title);
    setCategory(editingTask.category);
    setStatus(editingTask.status);
  }
}, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddTask(
  title,
  category,
  status,
  dueDate
);

    setTitle("");
    setCategory("Personal");
    setStatus("Backlog");

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingTask ? "Edit Task" : "Add New Task"}
              </h2>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                >
                  <option>Personal</option>
                  <option>Business</option>
                  <option>Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                >
                  <option>Backlog</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-slate-700 px-4 py-2 hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2 hover:bg-purple-700"
                >
                  {editingTask ? "Save Changes" : "Add Task"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}