"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/taskService";
import { GetTasksQuery } from "@/src/generated/graphql"; // Ensure correct path

export function useTasks() {
  return useQuery<GetTasksQuery["getTasks"], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks, // Directly use fetchTasks since it already returns `getTasks`
  });
}
