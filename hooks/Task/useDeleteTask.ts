"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/lib/taskService';
import toast from 'react-hot-toast';

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });
}
