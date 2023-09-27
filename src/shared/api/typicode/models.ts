import {DraggableLocation} from "react-beautiful-dnd";

export type Task = {
  id?: number;
  title?: string;
  description?: string;
  date_create?: string;
  subtasks?: Task[];
};

export type Column = {
  id?: number;
  title?: string;
  list?: Task[];
}

export type ColumnAction = {
  type: string;
  column?: Column;
  source?:  DraggableLocation;
  destination?: DraggableLocation;
} & Column

export type ColumnState = {
  columns: Column[];
  count_tasks: number;
}