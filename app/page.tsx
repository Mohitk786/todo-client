"use client";

import { useQuery } from "@apollo/client";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { GET_TASKS } from "@/graphql/queries/task";
import AddTaskForm from "@/components/task/addTaskForm";
import TaskCard from "@/components/task/TaskCard";

export default function Home() {
  
  const { data, refetch } = useQuery(GET_TASKS);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="p-6 h-screen bg-gradient-to-tr from-blue-700 to-blue-200">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onPress={onOpen}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.getTasks.map((task: any) => (
          <TaskCard key={task.id} task={task} refetch={refetch}/>
        ))}
      </div>

      <AddTaskForm refetch={refetch} isOpen={isOpen} onOpenChange={onOpenChange}  />
    </div>
  );
}
