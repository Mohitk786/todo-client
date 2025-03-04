"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import AddTaskForm from "@/components/task/addTaskForm";
import TaskCard from "@/components/task/TaskCard";
import { useTasks } from "@/hooks/Task/useTasks";
import { Task } from "@/types/taskTypes";
import Loader from "@/components/ui/Loader";

export default function Home() {
  const { data, isLoading, error, refetch } = useTasks();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddNewTask = () => {
    setMode("add");
    setSelectedTask(null);  // Clear any selected task when adding new
    onOpen();
  };

  const handleEdit = (task: Task) => {
    setMode("edit");
    setSelectedTask(task);  // Set selected task when editing
    onOpen();
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-700 to-blue-200">
        <div className="p-6 bg-white shadow-2xl rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="text-gray-700 mt-2">Failed to fetch tasks: {error.message}</p>
          <Button className="mt-4" onPress={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-700 to-blue-200 text-white">
      {/* Header */}
      <header className="w-full p-6 bg-blue-900 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Task Manager</h1>
          <Button onPress={handleAddNewTask} className="bg-white text-blue-900 font-semibold shadow-lg">
            + Add Task
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : data?.length === 0 ? (
          <div>No tasks available. Add a new task to get started!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.filter((task): task is Task => task !== null).map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                refetch={refetch} 
                onEdit={() => handleEdit(task)} // <-- Pass handleEdit callback
              />
            ))}
          </div>
        )}

        <AddTaskForm
          mode={mode} 
          isOpen={isOpen} 
          onOpenChange={onOpenChange} 
          task={selectedTask}  
        />
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-900 text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </footer>
    </div>
  );
}
