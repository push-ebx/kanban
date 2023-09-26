import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {Task} from "@/shared/api"
import styles from './styles.module.scss'
import cn from "classnames"

type TaskRowProps = { index: number } & Task;

const TaskRow = ({ title, index, id }: TaskRowProps) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
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
              {title}
            </div>
          )
        }
      }
    </Draggable>
  )
}

export {TaskRow}