/**
 * Represents a task in the Todo application
 */
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
} 