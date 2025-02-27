"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask } from '@/lib/taskService';
import toast from 'react-hot-toast';

export function useEditTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Ensure task list is refreshed
    },
    onError: (error: any) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });
}
