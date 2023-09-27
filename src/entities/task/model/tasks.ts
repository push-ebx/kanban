import {ColumnAction, ColumnState} from "@/shared/api";
import * as actionTypes from "./actionTypes"
import moment from "moment";

const initialState: ColumnState = {
  columns: [
    {
      id: 0,
      title: 'Queue',
      list: [{title: 'item 0', id: 0}, {title: 'item 1', id: 1}]
    },
    {
      id: 1,
      title: 'Development',
      list: [{title: 'item 2', id: 2}]
    },
    {
      id: 2,
      title: 'Done',
      list: []
    }
  ],
  count_tasks: 3
}

const taskReducer = (
  state: ColumnState = initialState,
  action: ColumnAction
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

        newEndList.splice(destination.index, 0, start.list[source.index])

        state.columns[start_index] = {...start, list: newStartList}
        state.columns[end_index] = {...end, list: newEndList}
      }

      return state
    }
    case actionTypes.ADD_TASK: {
      const {id, title} = action

      state.count_tasks++
      state.columns[id].list.push({
        title,
        id: state.count_tasks,
        description: '',
        date_create: moment().format("DD.MM.YY"),
        subtasks: [],
      })

      return {...state}
    }
  }
  return state
}

export {taskReducer}