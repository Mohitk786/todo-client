"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "@/lib/taskService";
import { MutationAddTaskArgs } from "@/src/generated/graphql";
import toast from "react-hot-toast";

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: MutationAddTaskArgs) => addTask(variables),
    onSuccess: () => {
      toast.success("Task added successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to add task: ${error.message}`);
    },
  });
}
