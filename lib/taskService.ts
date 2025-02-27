import { ADD_TASK, DELETE_TASK } from '@/graphql/mutations/task';
import {GET_TASKS} from '@/graphql/queries/task';
import { request } from 'graphql-request';
import { BASE_URL } from './constant';
import { Task } from '@/types/taskTypes';

interface FetcTasksResponse {
  getTasks: Task[];
}

export const fetchTasks = async () => {
  return request<FetcTasksResponse>(BASE_URL, GET_TASKS);
};

export const addTask = async (variables: {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
}) => {
  return request(BASE_URL, ADD_TASK, variables);
};

;
export const deleteTask = async ({ id }: { id: string }) => {
  return request(BASE_URL, DELETE_TASK, { id });
};