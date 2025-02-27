"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import AddTaskForm from "@/components/task/addTaskForm";
import TaskCard from "@/components/task/TaskCard";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/taskTypes";

export default function Home() {
  const { data, isLoading, error, refetch } = useTasks();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching tasks: {error.message}</p>;

  return (
    <div className="p-6 h-screen bg-gradient-to-tr from-blue-700 to-blue-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onPress={onOpen}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data && data.map((task:Task) => (
          <TaskCard key={task.id} task={task} refetch={refetch} />
        ))}
      </div>

      <AddTaskForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
