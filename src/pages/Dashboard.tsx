import StatCard from "../components/cards/StatCard";
import CategoryCard from "../components/cards/CategoryCard";
import TaskCard from "../components/cards/TaskCard";
import type { Task } from "../types/task";

type DashboardProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  searchTerm: string;
  onEditTask: (id: number) => void;
};

export default function Dashboard({
  tasks,
  setTasks,
  searchTerm,
  onEditTask,
}: DashboardProps) {
  const filteredTasks = tasks.filter((task) =>
  task.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())  
);
  return (
    <>
      <div className="mb-8 bg-slate-800/80 border border-slate-700 rounded-3xl p-6">
        <h2 className="text-2xl font-bold">
          👋 Good Morning, Asitha
        </h2>

        <p className="text-slate-400 mt-2">
          You have tasks waiting for you today.
        </p>
      </div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Backlog"
          value={9}
          color="bg-gradient-to-r from-orange-500 to-orange-400"
        />

        <StatCard
          title="In Progress"
          value={8}
          color="bg-gradient-to-r from-purple-600 to-fuchsia-500"
        />

        <StatCard
          title="Completed"
          value={11}
          color="bg-gradient-to-r from-green-500 to-emerald-400"
        />

        <StatCard
          title="Total Tasks"
          value={tasks.length}
          color="bg-gradient-to-r from-blue-600 to-cyan-500"
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Category Tasks
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <CategoryCard title="Personal" tasks={11} emoji="🔥" />
          <CategoryCard title="Business" tasks={9} emoji="💼" />
          <CategoryCard title="Work" tasks={8} emoji="📊" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          All My Tasks
        </h2>

        <div className="grid grid-cols-3 gap-6">
  {filteredTasks.length === 0 ? (
    <div className="col-span-3 text-center py-10 text-slate-400">
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
        onDelete={(id) =>
          setTasks(
            tasks.filter((task) => task.id !== id)
          )
        }
        onEdit={onEditTask}
      />
    ))
  )}
        </div>
      </div>
    </>
  );
}