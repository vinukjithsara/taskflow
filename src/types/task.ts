export type TaskStatus =
  | "Backlog"
  | "In Progress"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High";

export interface TeamMember {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  status: TaskStatus;
  dueDate: string;

  priority: TaskPriority;
  assigneeId: number;
}