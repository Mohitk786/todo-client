export interface TaskInput{
    title: string;
    description: string;
    priority: string;
    dueDate: string;
}


export interface Task {
  id: string;
  title: string;
  description: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}

export interface TaskCardProps {
  task: Task;
  refetch: () => void;
}
