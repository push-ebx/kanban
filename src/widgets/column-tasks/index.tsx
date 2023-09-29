import {TaskRow} from '@/entities/task'
import {Droppable} from 'react-beautiful-dnd'
import styles from './styles.module.scss'
import cn from "classnames"
import {Column} from "@/shared/api";
import {useDispatch} from "react-redux";
import {addTask} from "@/entities/task/model/actionCreators.ts";
import React, {useRef, useState} from "react";
import {Input} from "@/shared/ui/input";

type ColumnTasksProps = {
  isDroppable?: boolean
  newTask?: (title: string) => void
} & Column

const ColumnTasks = ({ list, title, isDroppable, id }: ColumnTasksProps) => {
  const dispatch = useDispatch()
  const taskInput = useRef<HTMLInputElement>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const handleNewTask = (e) => {
    if (e.key === 'Enter' || e.code === 'NumpadEnter') {
      if (!newTaskTitle.trim()) return

      dispatch(addTask(id, newTaskTitle, title))
      setNewTaskTitle("")
    }
  }

  return (
    <Droppable droppableId={id.toString()}>
      {provided => (
        <div className={styles.column}>
          <h4 className={styles.title}>{title}</h4>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(styles.taskList, { [styles.isDroppable]: isDroppable })}
          >
            {list.map((task, index) => (
              task && <TaskRow droppableId={id} key={task.id} index={index} />
            ))}
            {provided.placeholder}

          </div>
          <Input
            className={styles.newTask}
            placeholder={"+ Add task"}
            inputRef={taskInput}
            onKeyDownHandler={e => handleNewTask(e)}
            value={newTaskTitle}
            onChange={setNewTaskTitle}
          />
        </div>
      )}
    </Droppable>
  )
}

export {ColumnTasks}