import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import KanbanColumn from "../components/KanbanColumn";
import KanbanTaskCard from "../components/KanbanTaskCard";

import type {
  Task,
  TaskStatus,
  TeamMember,
} from "../types/task";

type BoardProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  teamMembers: TeamMember[];
};

const boardColumns: TaskStatus[] = [
  "Backlog",
  "In Progress",
  "Completed",
];

export default function Board({
  tasks,
  setTasks,
  teamMembers,
}: BoardProps) {
  const [activeTaskId, setActiveTaskId] =
    useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const activeTask = tasks.find(
    (task) => task.id === activeTaskId
  );

  const ownerNameById = new Map(
    teamMembers.map((member) => [
      member.id,
      member.name,
    ])
  );

  const handleDragStart = (
    event: DragStartEvent
  ) => {
    setActiveTaskId(Number(event.active.id));
  };

  const handleDragEnd = (
    event: DragEndEvent
  ) => {
    const { active, over } = event;

    setActiveTaskId(null);

    if (!over) return;

    const taskId = Number(active.id);
    const nextStatus = over.id as TaskStatus;

    if (!boardColumns.includes(nextStatus))
      return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: nextStatus,
            }
          : task
      )
    );
  };

  return (
    <div>
      <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-800/80 p-6">
        <h1 className="text-4xl font-bold">
          Board
        </h1>

        <p className="mt-2 text-slate-400">
          Drag tasks between columns to update
          their status.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() =>
          setActiveTaskId(null)
        }
      >
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {boardColumns.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasks.filter(
                (task) =>
                  task.status === status
              )}
              teamMembers={teamMembers}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <KanbanTaskCard
              task={activeTask}
              ownerName={
                ownerNameById.get(
                  activeTask.assigneeId
                ) ?? "Unassigned"
              }
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}