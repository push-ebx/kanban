import {createStore, combineReducers} from "redux";
import {taskReducer} from "@/entities/task/model";

const rootReducer = combineReducers({
  taskReducer
})

export const store = createStore(rootReducer)