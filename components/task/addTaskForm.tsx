"use client";

import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/select';
import { useAddTask } from '@/hooks/useAddTask';

interface TaskFormProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddTaskForm({ isOpen, onOpenChange }: TaskFormProps) {
  const [taskData, setTaskData] = useState({
    title: "New Task",
    description: "new task description",
    priority: "high",
    dueDate: "2022-12-31",
  });

  const { mutate: addTask, isPending } = useAddTask();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTask = () => addTask(taskData);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalBody>
          <label>Title</label>
          <Input name="title" value={taskData.title} onChange={onChange} />

          <label>Description</label>
          <Input name="description" value={taskData.description} onChange={onChange} />

          <Select
            label="Select Priority"
            selectedKeys={[taskData.priority]}
            onSelectionChange={(keys) =>
              setTaskData((prev) => ({ ...prev, priority: Array.from(keys)[0].toString() }))
            }
          >
            <SelectItem key="low">Low</SelectItem>
            <SelectItem key="medium">Medium</SelectItem>
            <SelectItem key="high">High</SelectItem>
          </Select>

          <label>Due Date</label>
          <Input type="date" name="dueDate" value={taskData.dueDate} onChange={onChange} />

          <Button onPress={handleAddTask} isDisabled={isPending}>
            {isPending ? "Adding..." : "Add"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
