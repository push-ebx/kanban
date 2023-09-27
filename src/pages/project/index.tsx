import styles from './styles.module.scss'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import React, {useState} from "react";
import {ColumnTasks} from "@/widgets/column-tasks";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {dragTask} from "@/entities/task/model/actionCreators.ts";

const Project = () => {
  const columns = useSelector((state: RootState) => state.taskReducer.columns)
  const _ = useSelector((state: RootState) => state.taskReducer)
  const dispatch = useDispatch()
  const [droppableId, setDroppableId] = useState("")


  const onDragEnd = ({source, destination}: DropResult) => {
    setDroppableId("")
    dispatch(dragTask(source, destination))
  }

  const onDragUpdate = ({destination}: DropResult) => {
    setDroppableId(destination?.droppableId)
  }

  return (
    <DragDropContext onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <div className={styles.columns}>
        {
          columns.map(col => (
            <ColumnTasks
              title={col.title}
              list={col.list}
              key={col.id}
              id={col.id}
              isDroppable={col.id.toString() === droppableId}
            />
          ))
        }
      </div>
    </DragDropContext>
  )
};

export default Project;