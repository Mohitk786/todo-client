"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/lib/taskService";
import toast from "react-hot-toast";
import { DeleteTaskMutation, DeleteTaskMutationVariables } from "@/src/generated/graphql";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<DeleteTaskMutation, Error, DeleteTaskMutationVariables>({
    mutationFn: async (variables) => {
      return deleteTask(variables); 
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });
}
