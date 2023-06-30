export enum TodoStatus {
  Pending = "pending",
  InProgress = "inProgress",
  Completed = "completed",
}

export interface Todo {
id: string;
  title: string;
  description: string;
  status: TodoStatus;
  isEditMode: boolean,
}

export interface TodoStore {
  [TodoStatus.Pending]: Todo[];
  [TodoStatus.InProgress]: Todo[];
  [TodoStatus.Completed]: Todo[];
}