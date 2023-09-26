import styles from './styles.module.scss'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import React, {useState} from "react";
import {ColumnTasks} from "@/widgets/column-tasks";

const Project = () => {
  const initialColumns = [
    {
      id: 0,
      title: 'Queue',
      list: [{title: '0', id: 0}, {title: '1', id: 1}]
    },
    {
      id: 1,
      title: 'Development',
      list: [{title: '2', id: 2}]
    },
    {
      id: 3,
      title: 'Done',
      list: []
    }
  ]
  const [columns, setColumns] = useState(initialColumns)
  const [droppableId, setDroppableId] = useState("")

  const onDragEnd = ({source, destination}: DropResult) => {
    setDroppableId("")

    if (!destination) return
    if (source.droppableId === destination.droppableId && destination.index === source.index) return

    const start_index = columns.findIndex(col => col.id.toString() == source.droppableId)
    const end_index = columns.findIndex(col => col.id.toString() == destination.droppableId)

    const start = columns[start_index]
    const end = columns[end_index]

    const newColumns = structuredClone(columns)

    if (start === end) {
      const newList = start.list.filter((_: never, idx: number) => idx !== source.index)

      newList.splice(destination.index, 0, start.list[source.index])
      newColumns[start_index] = {...start, list: newList}
      setColumns(state => newColumns)
    }
    else {
      const newStartList = start.list.filter((_: never, idx: number) => idx !== source.index)
      const newEndList = end.list

      newEndList.splice(destination.index, 0, start.list[source.index])

      newColumns[start_index] = {...start, list: newStartList}
      newColumns[end_index] = {...end, list: newEndList}

      setColumns(state => newColumns)
    }
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