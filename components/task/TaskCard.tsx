"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { TrashIcon, PencilIcon, CalendarIcon } from "lucide-react";
import { useDeleteTask } from "@/hooks/Task/useDeleteTask";
import { Task } from "@/types/taskTypes";
import { cn } from "@/lib/utils";



export interface TaskCardProps {
  task: Task;
  refetch: () => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 border border-green-300",
  medium: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  high: "bg-red-100 text-red-800 border border-red-300",
};


const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <Card className="relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

      <CardBody className="p-6 space-y-4">

        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
            {task.title}
          </h2>

          {task.priority && (
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                priorityColors[task.priority]
              )}
            >
              {task.priority}
            </span>
          )}
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <div className="flex items-center text-gray-500 text-sm space-x-2 mt-2">
            <CalendarIcon size={16} />
            <span className="font-medium">
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Edit task"
            onClick={() => onEdit(task)}
          >
            <PencilIcon size={20} />
          </button>
          <button
            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
            onClick={() => deleteTask({ id: task.id })}
            aria-label="Delete task"
          >
            <TrashIcon size={20} />
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
