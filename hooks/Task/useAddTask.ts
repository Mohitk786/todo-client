"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '@/lib/taskService';
import toast from 'react-hot-toast';

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      toast.success("Task added successfully!");
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to add task: ${error.message}`);
    },
  });
}
