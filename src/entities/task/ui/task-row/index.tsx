import React, {useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import styles from './styles.module.scss'
import cn from "classnames"
import external_link from './external-link.png'
import {IconButton} from "@/shared/ui/iconButton";
import {TaskModal} from "@/entities/task/ui/task-row/task-modal.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";

type TaskRowProps = {
  index: number;
  droppableId?: number;
};

const TaskRow = ({droppableId, index}: TaskRowProps) => {
  const [modalActive, setModalActive] = useState(false);
  const task = useSelector((state: RootState) => state.taskReducer.columns)[droppableId].list[index]

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
                {task.title}
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
      />
    </>
  )
}

export {TaskRow}