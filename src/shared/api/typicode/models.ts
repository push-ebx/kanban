import {DraggableLocation} from "react-beautiful-dnd";

export type status = "Queue" | "Development" | "Done";
export type priority = "Low" | "Medium" | "Height";

export type Comment = {
  id: string;
  text?: string;
  children: Comment[];
}

export type Subtask = {
  text: string;
}

export type Task = {
  id?: number;
  titleTask?: string;
  description?: string;
  date_create?: string;
  subtasks?: Subtask[];
  status?: status;
  priority?: priority;
  comments?: Comment;
};

export type Column = {
  id?: number;
  title?: status;
  list?: Task[];
}

export type ColumnAction = {
  type: string;
  column?: Column;
  source?:  DraggableLocation;
  destination?: DraggableLocation;
  indexTask?: number;
} & Column & Task

export type CommentAction = {
  type: string;
  id: string;
  text: string;
  index_task: number;
  index_column: number;
}

export type SubtaskAction = {
  type: string;
  droppableId,
  index,
  subtask,
  subtask_index: number
}

export type ColumnState = {
  columns: Column[];
  count_tasks: number;
}
