export interface TaskInput{
    title: string;
    description: string;
    priority: string;
    dueDate: string;
}


export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}


