import { useDroppable } from "@dnd-kit/core";
import { FiInbox } from "react-icons/fi";
import KanbanTaskCard from "./KanbanTaskCard";
import type {
    Task,
  TaskStatus,
  TeamMember,
} from "../types/task";

type KanbanColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  teamMembers: TeamMember[];
};

const getColumnAccent = (status: TaskStatus) => {
  switch (status) {
    case "Completed":
      return {
        dot: "bg-green-500",
        ring: "ring-green-500/20",
      };
    case "In Progress":
      return {
        dot: "bg-purple-500",
        ring: "ring-purple-500/20",
      };
    default:
      return {
        dot: "bg-orange-500",
        ring: "ring-orange-500/20",
      };
  }
};

export default function KanbanColumn({
  status,
  tasks,
  teamMembers,
}: KanbanColumnProps) {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({
    id: status,
  });

  const accent = getColumnAccent(status);
  const ownerNameById = new Map(
    teamMembers.map((member) => [member.id, member.name])
  );

  return (
    <section
      ref={setNodeRef}
      className={`min-h-96 rounded-3xl border bg-slate-800/80 p-4 transition duration-200 sm:p-5 ${
        isOver
          ? `border-purple-400 bg-slate-800 ring-4 ${accent.ring}`
          : "border-slate-700"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`h-3 w-3 rounded-full ${accent.dot}`}
          />

          <div>
            <h2 className="text-lg font-bold">
              {status}
            </h2>
            <p className="text-xs text-slate-500">
              {tasks.length} task{tasks.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center">
            <FiInbox className="mb-3 text-slate-500" size={28} />
            <p className="font-medium text-slate-400">
              No tasks
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Drop a task here to move it to {status}.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              ownerName={
                ownerNameById.get(task.assigneeId) ?? "Unassigned"
              }
            />
          ))
        )}
      </div>
    </section>
  );
}
