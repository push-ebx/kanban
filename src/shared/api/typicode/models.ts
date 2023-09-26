export type Task = {
  id?: number;
  title?: string;
  completed?: boolean;
};

export type Column = {
  id?: number;
  title?: string;
  list?: Task[];
}

export type TaskAction = {
  type: string;
  task: Task
}

export type TasksState = {
  tasks: Task[]
}