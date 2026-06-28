type Props = {
  id: number;
  title: string;
  category: string;
  status: string;
  onDelete: (id: number) => void;
};

export default function TaskCard({
  id,
  title,
  category,
  status,
  onDelete,
}: Props) {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-purple-500";
      default:
        return "bg-orange-500";
    }
  };

  return (
    <div
      className="
      bg-slate-800/80 backdrop-blur-sm
      border border-slate-700
      rounded-3xl
      p-6
      hover:border-purple-500
      hover:-translate-y-1
      transition-all duration-300
      shadow-lg
      "
    >
      {/* Top Row */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">
          {category}
        </span>

        <span
          className={`${getStatusColor()} text-xs px-3 py-1 rounded-full`}
        >
          {status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-4">
        {title}
      </h3>

      {/* Info */}
      <div className="space-y-2 text-slate-400 text-sm mb-4">
        <p>📅 Due Tomorrow</p>
        <p>👤 Assigned to You</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(id)}
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl transition"
      >
        🗑 Delete Task
      </button>
    </div>
  );
}