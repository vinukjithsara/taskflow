type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddTaskModal({
  isOpen,
  onClose,
}: AddTaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 max-w-lg w-full rounded-2xl p-6 border border-slate-700">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Add New Task
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Category
            </label>

            <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white">
              <option>Personal</option>
              <option>Business</option>
              <option>Work</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Status
            </label>

            <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white">
              <option>Backlog</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700"
            >
              Add Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}