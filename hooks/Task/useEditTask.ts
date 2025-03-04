"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "@/lib/taskService";
import toast from "react-hot-toast";
import { EditTaskMutation, EditTaskMutationVariables } from "@/src/generated/graphql";

export function useEditTask() {
  const queryClient = useQueryClient();

  return useMutation<EditTaskMutation, Error, EditTaskMutationVariables>({
    mutationFn: editTask, 
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); 
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });
}
