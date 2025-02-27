"use client"

import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String!, $priority: String!, $dueDate: String) {
    addTask(title: $title, description: $description, priority: $priority, dueDate: $dueDate) {
      id
      title
      description
      completed
      priority
      dueDate
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask(
    $id: ID!
    $title: String
    $description: String
    $priority: String
    $dueDate: String
  ) {
    editTask(
      id: $id
      title: $title
      description: $description
      priority: $priority
      dueDate: $dueDate
    ) {
      id
      title
      description
      priority
      dueDate
      completed
    }
  }
`;