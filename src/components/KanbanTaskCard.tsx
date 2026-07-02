import { useDraggable } from "@dnd-kit/core";
import { FiCalendar, FiUser } from "react-icons/fi";
import type {
  Task,
  TaskPriority,
} from "../types/task";

type KanbanTaskCardProps = {
  task: Task;
  ownerName: string;
  isOverlay?: boolean;
};

const getPriorityBadge = (priority: TaskPriority) => {
  switch (priority) {
    case "High":
      return {
        label: "🔴 High",
        color: "border-red-500/40 bg-red-500/15 text-red-300",
      };
    case "Medium":
      return {
        label: "🟡 Medium",
        color: "border-yellow-500/40 bg-yellow-500/15 text-yellow-300",
      };
    default:
      return {
        label: "🟢 Low",
        color: "border-green-500/40 bg-green-500/15 text-green-300",
      };
  }
};

export default function KanbanTaskCard({
  task,
  ownerName,
  isOverlay = false,
}: KanbanTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
    disabled: isOverlay,
    data: {
      taskId: task.id,
      status: task.status,
    },
  });

  const priorityBadge = getPriorityBadge(task.priority);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:border-purple-500 ${
        isOverlay
          ? "cursor-grabbing shadow-2xl ring-2 ring-purple-400"
          : "cursor-grab active:cursor-grabbing"
      } ${isDragging ? "opacity-40" : ""}`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200">
          {task.category}
        </span>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityBadge.color}`}
        >
          {priorityBadge.label}
        </span>
      </div>

      <h3 className="mb-4 wrap-break-word text-base font-semibold text-white">
        {task.title}
      </h3>

      <div className="space-y-2 text-sm text-slate-400">
        <p className="flex items-center gap-2">
          <FiCalendar />
          Due: {task.dueDate}
        </p>

        <p className="flex items-center gap-2">
          <FiUser />
          {ownerName}
        </p>
      </div>
    </article>
  );
}