import * as actionTypes from "./actionTypes.ts"
import {ColumnAction} from "@/shared/api";

export function dragTask(source, destination) {
  const action: ColumnAction = {
    type: actionTypes.DRAG_TASK,
    source,
    destination
  }

  return action
}

export function addTask(id, titleTask) {
  const action: ColumnAction = {
    type: actionTypes.ADD_TASK,
    id,
    title: titleTask
  }

  return action
}