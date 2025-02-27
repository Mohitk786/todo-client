// lib/taskService.ts
import { ADD_TASK, DELETE_TASK } from '@/graphql/mutations/task';
import {GET_TASKS} from '@/graphql/queries/task';
import { request } from 'graphql-request';

const endpoint = 'http://localhost:8000/graphql';

export const fetchTasks = async () => {
  return request(endpoint, GET_TASKS);
};

export const addTask = async (variables: {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
}) => {
  return request(endpoint, ADD_TASK, variables);
};

;
export const deleteTask = async ({ id }: { id: string }) => {
  return request(endpoint, DELETE_TASK, { id });
};