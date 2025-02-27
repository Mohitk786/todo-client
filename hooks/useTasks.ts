"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/lib/taskService';
import { Task } from '@/types/taskTypes';

interface FetcTasksResponse {
  getTasks: Task[];
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response:FetcTasksResponse = await fetchTasks()
      return response?.getTasks;
    },
  });
}
