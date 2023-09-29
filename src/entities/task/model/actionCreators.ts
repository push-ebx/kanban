import * as actionTypes from "./actionTypes.ts"
import {ColumnAction, CommentAction, SubtaskAction} from "@/shared/api";

export const dragTask = (source, destination) => {
  const action: ColumnAction = {
    type: actionTypes.DRAG_TASK,
    source,
    destination
  }

  return action
}

export const addTask = (id, titleTask, status) => {
  const action: ColumnAction = {
    type: actionTypes.ADD_TASK,
    id,
    titleTask,
    status
  }

  return action
}

export const changePriorityTask = (id, indexTask, priority) => {
  const action: ColumnAction = {
    type: actionTypes.CHANGE_PRIORITY_TASK,
    id,
    indexTask,
    priority
  }

  return action
}

export const changeTitleTask = (id, indexTask, titleTask) => {
  const action: ColumnAction = {
    type: actionTypes.CHANGE_TITLE_TASK,
    id,
    indexTask,
    titleTask
  }

  return action
}

export const changeDescriptionTask = (id, indexTask, description) => {
  const action: ColumnAction = {
    type: actionTypes.CHANGE_DESCRIPTION_TASK,
    id,
    indexTask,
    description
  }

  return action
}

export const addComment = (id, text, index_task, index_column) => {
  const action: CommentAction = {
    type: actionTypes.ADD_COMMENT,
    id,
    text,
    index_task,
    index_column
  }

  return action
}

export const addSubtask = (droppableId, index, subtask) => {
  const action: SubtaskAction = {
    type: actionTypes.ADD_SUBTASK,
    droppableId,
    index,
    subtask
  }

  return action
}

export const deleteTask = (droppableId, index) => {
  const action: SubtaskAction = {
    type: actionTypes.DELETE_TASK,
    droppableId,
    index
  }

  return action
}

export const deleteSubTask = (droppableId, index, subtask_index) => {
  const action: SubtaskAction = {
    type: actionTypes.DELETE_SUBTASK,
    droppableId,
    index,
    subtask_index
  }

  return action
}