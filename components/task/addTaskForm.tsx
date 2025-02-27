"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useAddTask } from "@/hooks/Task/useAddTask";
import { useEditTask } from "@/hooks/Task/useEditTask";
import { Task } from "@/types/taskTypes";

interface TaskFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  task: Task | null; 
  refetch?: () => void; 
}

export default function TaskForm({
  isOpen,
  onOpenChange,
  mode,
  task,
  refetch,
}: TaskFormProps) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const { mutate: addTask, isPending: isAdding } = useAddTask();
  const { mutate: editTask, isPending: isEditing } = useEditTask();

  useEffect(() => {
    if (mode === "edit" && task) {
      setTaskData({
        title: task.title,
        description: task.description || "",
        priority: task.priority || "",
        dueDate: task.dueDate?.split("T")[0] || "",
      });
    } else {
      setTaskData({ title: "", description: "", priority: "", dueDate: "" });
    }
  }, [mode, task, isOpen]);



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line
  const handlePriorityChange = (keys: any) => {
    const selected = Array.from(keys)[0]?.toString() || "";
    setTaskData((prev) => ({ ...prev, priority: selected }));
  };

  const handleSubmit = () => {
    if (!taskData.title || !taskData.priority || !taskData.dueDate) {
      alert("Please fill out all required fields.");
      return;
    }

    if (mode === "edit" && task) {
      editTask(
        { 
          id: task.id, 
          ...taskData 
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            refetch?.(); 
          },
          onError: (err) => {
            console.error("Failed to edit task:", err);
            alert("Failed to edit task");
          }
        }
      );
    } else {
      addTask(taskData, {
        onSuccess: () => {
          onOpenChange(false);
          refetch?.();
        },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-lg w-full mx-auto">
        <ModalHeader className="text-xl font-bold text-gray-800">
          {mode === "edit" ? "Edit Task" : "Add New Task"}
        </ModalHeader>
        <ModalBody className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              className={`w-full ${mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              placeholder="Optional description"
              rows={3}
              className="text-gray-900 w-full border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none p-2"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <Select
              label="Select Priority"
              selectedKeys={[taskData.priority]}
              onSelectionChange={handlePriorityChange}
              className="w-full"
            >
              <SelectItem className="text-gray-900" key="low">Low</SelectItem>
              <SelectItem className="text-gray-900" key="medium">Medium</SelectItem>
              <SelectItem className="text-gray-900" key="high">High</SelectItem>
            </Select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleInputChange}
              className={`w-full ${mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
          </div>
        </ModalBody>

        {/* Footer */}
        <ModalFooter className="flex justify-end space-x-3">
          <Button
            onPress={() => onOpenChange(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </Button>

          <Button
            onPress={handleSubmit}
            isDisabled={isAdding || isEditing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isAdding || isEditing
              ? "Saving..."
              : mode === "edit"
              ? "Save Changes"
              : "Add Task"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
