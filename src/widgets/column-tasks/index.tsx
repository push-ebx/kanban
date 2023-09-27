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
      dispatch(addTask(id, newTaskTitle))
      setNewTaskTitle("")
    }
  }

  return (
    <Droppable droppableId={id.toString()}>
      {provided => (
        <div className={styles.column}>
          <h2>{title}</h2>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(styles.taskList, { [styles.isDroppable]: isDroppable })}
          >
            {list.map((task, index) => (
              task && <TaskRow droppableId={id} key={task.id} index={index} />
            ))}
            {provided.placeholder}
            <Input
              placeholder={"New task"}
              inputRef={taskInput}
              onKeyDownHandler={e => handleNewTask(e)}
              value={newTaskTitle}
              onChange={setNewTaskTitle}
            />
          </div>
        </div>
      )}
    </Droppable>
  )
}

export {ColumnTasks}