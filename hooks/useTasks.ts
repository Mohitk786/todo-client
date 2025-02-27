"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/lib/taskService';

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
}
