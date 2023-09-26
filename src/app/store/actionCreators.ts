import * as actionTypes from "./actionTypes"
import {Task, TaskAction} from "@/shared/api";

export function addTask(task: Task) {
  const action: TaskAction = {
    type: actionTypes.ADD_TASK,
    task,
  }

  return action
}

// export function removeArticle(article: IArticle) {
//   const action: ArticleAction = {
//     type: actionTypes.REMOVE_ARTICLE,
//     article,
//   }
//   return action
// }