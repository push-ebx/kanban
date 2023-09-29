import React, {useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styles from './styles.module.scss'
import cn from "classnames"
import external_link from './external-link.png'
import {IconButton} from "@/shared/ui/iconButton";
import {TaskModal} from "@/entities/task/ui/task-row/task-modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {
  addSubtask,
  changeDescriptionTask,
  changePriorityTask,
  changeTitleTask
} from "@/entities/task/model/actionCreators.ts";

type TaskRowProps = {
  index: number;
  droppableId?: number;
};

const TaskRow = ({droppableId, index}: TaskRowProps) => {
  const [modalActive, setModalActive] = useState(false);
  const task = useSelector((state: RootState) => state.taskReducer.columns)[droppableId].list[index]
  const dispatch = useDispatch()

  const handleNewSubtask = (e, subtask) => {
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
              >
                {task.titleTask}
                <IconButton src={external_link} onClick={() => setModalActive(true)}/>
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
      />
    </>
  )
}

export {TaskRow}