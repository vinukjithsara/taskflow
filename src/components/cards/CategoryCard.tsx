import { motion } from "framer-motion";

type Props = {
  title: string;
  tasks: number;
  emoji: string;
};

export default function CategoryCard({
  title,
  tasks,
  emoji,
}: Props) {
  const percentage =
    title === "Personal"
      ? 78
      : title === "Business"
      ? 65
      : 90;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01, borderColor: "#a855f7" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
      bg-slate-800/80 backdrop-blur-sm
      border
      border-slate-700
      rounded-3xl
      p-6
      hover:border-purple-500
      transition-all
      duration-300
      "
    >
      <div className="text-4xl mb-4">
        {emoji}
      </div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="text-slate-400 mt-2">
        {tasks} Tasks
      </p>

      <div className="mt-5">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>

        <div className="h-2 bg-slate-700 rounded-full">
          <div
            className="h-2 bg-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}