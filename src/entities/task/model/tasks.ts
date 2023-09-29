import {ColumnAction, ColumnState, Comment, CommentAction, SubtaskAction} from "@/shared/api";
import * as actionTypes from "./actionTypes"
import moment from "moment";

const comment: Comment = { id: '', children: []}
const loadState = () => {
  try {
    const serialState = localStorage.getItem('appState');
    if (serialState === null) {
      return undefined;
    }

    return JSON.parse(JSON.parse(serialState)).taskReducer;
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const initialState: ColumnState = {
  columns: [
    {
      id: 0,
      title: 'Queue',
      list: []
    },
    {
      id: 1,
      title: 'Development',
      list: []
    },
    {
      id: 2,
      title: 'Done',
      list: []
    }
  ],
  count_tasks: 0,
  ...persistedState
}

const taskReducer = (
  state: ColumnState = initialState,
  action: ColumnAction & CommentAction & SubtaskAction
): ColumnState => {
  switch (action.type) {
    case actionTypes.DRAG_TASK: {
      const {source, destination} = action

      if (!destination || source.droppableId === destination.droppableId && destination.index === source.index) {
        return state
      }

      const start_index = state.columns.findIndex(col => col.id.toString() == source.droppableId)
      const end_index = state.columns.findIndex(col => col.id.toString() == destination.droppableId)

      const start = state.columns[start_index]
      const end = state.columns[end_index]

      if (start === end) {
        const newList = start.list.filter((_: never, idx: number) => idx !== source.index)

        newList.splice(destination.index, 0, start.list[source.index])
        state.columns[start_index] = {...start, list: newList}
      }
      else {
        const newStartList = start.list.filter((_: never, idx: number) => idx !== source.index)
        const newEndList = end.list

        newEndList.splice(destination.index, 0, {...start.list[source.index], status: end.title})

        state.columns[start_index] = {...start, list: newStartList}
        state.columns[end_index] = {...end, list: newEndList}
      }

      return state
    }
    case actionTypes.ADD_TASK: {
      const {id, titleTask, status} = action

      state.columns[id].list.push({
        titleTask,
        status,
        id: state.count_tasks++,
        description: '',
        date_create: moment().format("DD.MM.YY hh:mm a"),
        subtasks: [],
        priority: "Medium",
        comments: {id: '', children: []}
      })

      return {...state}
    }
    case actionTypes.CHANGE_PRIORITY_TASK: {
      const {id, indexTask, priority} = action
      state.columns[id].list[indexTask].priority = priority
      return {...state}
    }
    case actionTypes.CHANGE_TITLE_TASK: {
      const {id, indexTask, titleTask} = action
      state.columns[id].list[indexTask].titleTask = titleTask
      return {...state}
    }
    case actionTypes.CHANGE_DESCRIPTION_TASK: {
      const {id, indexTask, description} = action
      state.columns[id].list[indexTask].description = description
      return {...state}
    }
    case actionTypes.ADD_COMMENT: {
      const {id, text, index_task, index_column }: CommentAction = action
      const commentsCopy = structuredClone(state.columns[index_column].list[index_task].comments)
      let temp = commentsCopy
      const indexes = id.split('.')

      for (const i of indexes) temp = temp.children[i] ?? temp
      console.log(temp)

      temp.children.push({
        id: id.concat('.', temp.children.length.toString()),
        children: [],
        text
      })

      state.columns[index_column].list[index_task].comments = commentsCopy;

      return {...state}
    }
    case actionTypes.ADD_SUBTASK: {
      const {droppableId, index, subtask} = action
      const subtasksCopy = structuredClone(state.columns[droppableId].list[index].subtasks)

      subtasksCopy.push({
        text: subtask
      })

      state.columns[droppableId].list[index].subtasks = subtasksCopy;

      return {...state}
    }
    case actionTypes.DELETE_TASK: {
      const {droppableId, index} = action
      const tasksCopy = structuredClone(state.columns[droppableId].list)
      tasksCopy.splice(index, 1)
      state.columns[droppableId].list = tasksCopy;

      return {...state}
    }

    case actionTypes.DELETE_SUBTASK: {
      const {droppableId, index, subtask_index} = action
      const taskCopy = structuredClone(state.columns[droppableId].list[index])
      taskCopy.subtasks.splice(subtask_index, 1)
      state.columns[droppableId].list[index] = taskCopy;

      return {...state}
    }
  }

  return state
}

export {taskReducer}