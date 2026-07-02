import TaskCard from "../components/cards/TaskCard";
import type { Task } from "../types/task";

type TasksProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  searchTerm: string;
  onEditTask: (id: number) => void;
  onOpenAddTask: () => void;
};

export default function Tasks({
  tasks,
  setTasks,
  searchTerm,
  onEditTask,
  onOpenAddTask,
}: TasksProps) {
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-slate-700/80 bg-slate-800/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Tasks
            </h1>

            <p className="mt-2 text-slate-400">
              Manage, edit, and prioritize your work from one place.
            </p>
          </div>

          <button
            onClick={onOpenAddTask}
            className="rounded-xl bg-purple-600 px-5 py-3 font-medium transition hover:bg-purple-700"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-slate-700/80 bg-slate-800/70 p-10 text-center text-slate-400">
            🔍 No tasks found
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              status={task.status}
              dueDate={task.dueDate}
              onDelete={(id) => setTasks(tasks.filter((item) => item.id !== id))}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}