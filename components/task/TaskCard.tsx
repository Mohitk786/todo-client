"use client";

import React from 'react';
import { Card, CardBody } from '@heroui/card';
import { TrashIcon, PencilIcon, CalendarIcon } from 'lucide-react';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { TaskCardProps } from '@/types/taskTypes';

const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <Card className="p-5 bg-white shadow-lg rounded-2xl border border-gray-200 transition-transform transform hover:scale-105">
      <CardBody>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
          {task.priority && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
              {task.priority.toUpperCase()}
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-2 text-sm">{task.description}</p>

        {task.dueDate && (
          <div className="flex items-center text-gray-500 text-sm mt-3">
            <CalendarIcon size={16} className="mr-1" />
            <span>{(task.dueDate).toString().split('T')[0]}</span>
          </div>
        )}

        <div className="flex justify-end mt-4 space-x-3">
          <button className="text-blue-500 hover:text-blue-700 transition">
            <PencilIcon size={20} />
          </button>
          <button
            className="text-red-500 hover:text-red-700 transition"
            onClick={() => deleteTask({ id: task.id })}
          >
            <TrashIcon size={20} />
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
