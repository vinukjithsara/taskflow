import StatCard from "../components/cards/StatCard";
import CategoryCard from "../components/cards/CategoryCard";
import type { Task } from "../types/task";
import { motion } from "framer-motion";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

type DashboardProps = {
  tasks: Task[];
};

export default function Dashboard({ tasks }: DashboardProps) {
  const backlogCount = tasks.filter(
    (task) => task.status === "Backlog"
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completedTasks = completedCount;

  const progressPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const highPriorityCount = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const categoryData = Object.entries(
    tasks.reduce<Record<string, number>>((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const statusData = [
    { name: "Backlog", value: backlogCount, color: "#fb923c" },
    { name: "In Progress", value: inProgressCount, color: "#8b5cf6" },
    { name: "Completed", value: completedCount, color: "#34d399" },
  ].filter((entry) => entry.value > 0);

  const trendData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (5 - index));

    const label = date.toLocaleDateString("en", { month: "short", day: "numeric" });
    const completedOnDate = tasks.filter((task) => {
      if (task.status !== "Completed") return false;
      const dueDate = new Date(task.dueDate);
      return dueDate.toDateString() === date.toDateString();
    }).length;

    return {
      day: label,
      completed: completedOnDate,
    };
  });

  const summaryCards = [
    {
      title: "Total Tasks",
      value: tasks.length,
      color: "bg-gradient-to-r from-slate-700 to-slate-600",
      subtitle: "Across your workspace",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      color: "bg-gradient-to-r from-emerald-500/20 to-emerald-400/10",
      subtitle: "Finished with momentum",
    },
    {
      title: "Completion Rate",
      value: `${progressPercentage}%`,
      color: "bg-gradient-to-r from-purple-600/20 to-fuchsia-500/10",
      subtitle: "Healthy delivery pace",
    },
    {
      title: "High Priority",
      value: highPriorityCount,
      color: "bg-gradient-to-r from-orange-500/20 to-amber-400/10",
      subtitle: "Needs attention",
    },
  ];

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="rounded-4xl border border-slate-700/80 bg-slate-800/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold">
          👋 Good Morning, Asitha
        </h2>

        <p className="mt-2 text-slate-400">
          You have tasks waiting for you today.
        </p>
      </section>

      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-[28px] border border-slate-700/80 bg-slate-800/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                🚀 Project Progress
              </h2>

              <p className="mt-2 text-slate-400">
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>

            <span className="text-3xl font-bold text-purple-400">
              {progressPercentage}%
            </span>
          </div>

          <div className="h-4 w-full rounded-full bg-slate-700">
            <div
              className="h-4 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Category Tasks</h2>
            <p className="mt-1 text-sm text-slate-400">A breakdown of your current workload</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categoryData.length > 0 ? (
            categoryData.map((category) => (
              <CategoryCard
                key={category.name}
                title={category.name}
                tasks={category.value}
                emoji={category.name === "Work" ? "📊" : category.name === "Business" ? "💼" : "🔥"}
              />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-slate-700/80 bg-slate-800/70 p-6 text-center text-slate-400">
              No categories yet
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Analytics Overview</h2>
            <p className="mt-1 text-sm text-slate-400">At-a-glance performance indicators</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-[0_18px_45px_rgba(2,6,23,0.28)] backdrop-blur-xl ${card.color}`}
            >
              <p className="text-sm text-slate-300">{card.title}</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{card.value}</h3>
              <p className="mt-2 text-sm text-slate-400">{card.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Charts</h2>
            <p className="mt-1 text-sm text-slate-400">Visual insights from your task activity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="rounded-[28px] border border-slate-700/80 bg-slate-800/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.25)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">Task Status Distribution</h3>
                <p className="text-sm text-slate-400">Live workload balance</p>
              </div>
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-300">Updated</span>
            </div>

            <div className="h-72">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      innerRadius={72}
                      outerRadius={95}
                      paddingAngle={3}
                    >
                      {statusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">No task data yet</div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-[28px] border border-slate-700/80 bg-slate-800/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.25)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">Tasks by Category</h3>
                <p className="text-sm text-slate-400">Breakdown by focus area</p>
              </div>
            </div>

            <div className="h-72">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 8, right: 20, left: 10, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">No category data yet</div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-[28px] border border-slate-700/80 bg-slate-800/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.25)] backdrop-blur-xl xl:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">Productivity Trend</h3>
                <p className="text-sm text-slate-400">Completed tasks over the last week</p>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: "#c084fc" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
