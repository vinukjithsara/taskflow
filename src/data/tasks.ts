import type { Task } from "../types/task";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Instagram Post",
    category: "Marketing",
    status: "Backlog",
    dueDate: "2026-07-10",
    priority: "Medium",
    assigneeId: 1,
  },
  {
    id: 2,
    title: "Create Dashboard UI",
    category: "Development",
    status: "In Progress",
    dueDate: "2026-07-12",
    priority: "High",
    assigneeId: 2,
  },
  {
    id: 3,
    title: "Prepare Project Report",
    category: "Business",
    status: "Completed",
    dueDate: "2026-07-15",
    priority: "Low",
    assigneeId: 3,
  },
];