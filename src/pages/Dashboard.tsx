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

  const backlogCount = tasks.filter(
  (task) => task.status === "Backlog"
).length;

const inProgressCount = tasks.filter(
  (task) => task.status === "In Progress"
).length;

const completedCount = tasks.filter(
  (task) => task.status === "Completed"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

const progressPercentage =
  tasks.length > 0
    ? Math.round(
        (completedTasks / tasks.length) * 100
      )
    : 0;

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

      <div className="mb-12 bg-slate-800 border border-slate-700 rounded-3xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              🚀 Project Progress
            </h2>

            <p className="text-slate-400 mt-2">
              {completedTasks} of {tasks.length} tasks completed
            </p>
          </div>

          <span className="text-3xl font-bold text-purple-400">
            {progressPercentage}%
          </span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className="bg-purple-500 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Backlog"
          value={backlogCount}
          color="bg-gradient-to-r from-orange-500 to-orange-400"
        />

        <StatCard
          title="In Progress"
          value={inProgressCount}
          color="bg-gradient-to-r from-purple-600 to-fuchsia-500"
        />

        <StatCard
          title="Completed"
          value={completedCount}
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
        dueDate={task.dueDate}
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
