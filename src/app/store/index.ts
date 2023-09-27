import {createStore, combineReducers, Store} from "redux";
import {taskReducer} from "@/entities/task/model";
import {ColumnAction, ColumnState} from "@/shared/api";

const rootReducer = combineReducers({
  taskReducer
})

export const store: Store<ColumnState, ColumnAction> = createStore(rootReducer)
export type RootState = ReturnType<typeof rootReducer>