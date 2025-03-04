import { ADD_TASK, DELETE_TASK, EDIT_TASK } from '@/graphql/mutations/task';
import { GET_TASKS } from '@/graphql/queries/task';
import { request } from 'graphql-request';
import { BASE_URL } from './constant';
import {
  MutationAddTaskArgs,
  GetTasksQuery,
  EditTaskMutation, 
  EditTaskMutationVariables
} from '@/src/generated/graphql';

import { DeleteTaskMutation, DeleteTaskMutationVariables } from "@/src/generated/graphql";



export const fetchTasks = async (): Promise<GetTasksQuery["getTasks"]> => {
  return request<GetTasksQuery>(BASE_URL, GET_TASKS).then((data) => data.getTasks);
};

export const addTask = async (variables: MutationAddTaskArgs) => {
  return request(BASE_URL, ADD_TASK, variables);
};

export const deleteTask = async (
  variables: DeleteTaskMutationVariables
): Promise<DeleteTaskMutation> => {
  return request<DeleteTaskMutation>(BASE_URL, DELETE_TASK, variables);
};



export const editTask = async (
  variables: EditTaskMutationVariables
): Promise<EditTaskMutation> => {
  return request<EditTaskMutation>(BASE_URL, EDIT_TASK, variables);
};
