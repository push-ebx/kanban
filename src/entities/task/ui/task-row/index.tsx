import React, {useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styles from './styles.module.scss'
import cn from "classnames"
import {TaskModal} from "@/entities/task/ui/task-row/task-modal/taskModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {
  addSubtask,
  changeDescriptionTask,
  changePriorityTask,
  changeTitleTask, deleteSubTask, deleteTask
} from "@/entities/task/model/actionCreators.ts";
import {Priority} from "@/shared/ui/priority";
import {Subtask} from "@/shared/ui/subtask/subtask.tsx";

type TaskRowProps = {
  index: number;
  droppableId?: number;
};

const TaskRow = ({droppableId, index}: TaskRowProps) => {
  const [modalActive, setModalActive] = useState(false);
  const task = useSelector((state: RootState) => state.taskReducer.columns)[droppableId].list[index]
  const dispatch = useDispatch()

  const handleNewSubtask = (e, subtask) => {
    if (!subtask.trim()) return

    if (e.key === 'Enter' || e.code === 'NumpadEnter') {
      dispatch(addSubtask(droppableId, index, subtask))
    }
  }

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {
          (provided) => {
            const isDraggable = (
              provided.draggableProps.style.transition !== "none" &&
              !!provided.draggableProps.style.transition
            )

            return (
              <div
                className={cn(styles.taskRow, { [styles.isDraggable]: isDraggable }) }
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => setModalActive(true)}
              >
                <div className={styles.topbar}>
                  <Priority priority={task.priority}/>
                  <div className={styles.date}>{task.date_create}</div>
                </div>
                <div className={styles.titleTask}>
                  {task.titleTask}
                </div>
                  {
                    !!task.subtasks.length &&
                    <div className={styles.subtasks}>
                      {
                        task.subtasks.map(subtask => <Subtask text={subtask.text} />)
                      }
                    </div>
                  }
              </div>
            )
          }
        }
      </Draggable>

      <TaskModal
        modalActive={modalActive}
        setModalActive={setModalActive}
        task={task}
        handleChangePriority={value => dispatch(changePriorityTask(droppableId, index, value))}
        handleChangeTitleTask={value => dispatch(changeTitleTask(droppableId, index, value))}
        handleChangeDescriptionTask={value => dispatch(changeDescriptionTask(droppableId, index, value))}
        handleNewSubtask={handleNewSubtask}
        index_task={index}
        index_column={droppableId}
        handleDeleteTask={() => dispatch(deleteTask(droppableId, index))}
        handleDeleteSubtask={subtask_index => dispatch(deleteSubTask(droppableId, index, subtask_index))}
      />
    </>
  )
}

export {TaskRow}