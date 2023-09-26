import styles from './styles.module.scss'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {useState} from "react";
import {ColumnTasks} from "@/widgets/column-tasks";

const Project = () => {
  const initialColumns = {
    Queue: {
      id: 'Queue',
      list: [{title: 'item 2', id: 1}, {title: 'item 2', id: 2}, {title: 'item 3', id: 3}]
    },
    Development: {
      id: 'Development',
      list: []
    },
    Done: {
      id: 'Done',
      list: []
    }
  }
  const [columns, setColumns] = useState(initialColumns)
  const [droppableId, setDroppableId] = useState("")

  const onDragEnd = ({source, destination}: DropResult) => {
    setDroppableId("")

    if (destination === undefined || destination === null) return
    if (source.droppableId === destination.droppableId && destination.index === source.index) return

    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]

    if (start === end) {
      const newList = start.list.filter((_: never, idx: number) => idx !== source.index)

      newList.splice(destination.index, 0, start.list[source.index])

      const newCol = {
        id: start.id,
        list: newList
      }

      setColumns(state => ({...state, [newCol.id]: newCol}))
      return null
    } else {
      const newStartList = start.list.filter((_: never, idx: number) => idx !== source.index)

      const newStartCol = {
        id: start.id,
        list: newStartList
      }

      const newEndList = end.list

      newEndList.splice(destination.index, 0, start.list[source.index])

      const newEndCol = {
        id: end.id,
        list: newEndList
      }

      setColumns(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }))
      return null
    }
  }

  const onDragUpdate = ({destination}: DropResult) => {
    setDroppableId(destination?.droppableId)
  }

  return (
    <DragDropContext onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <div className={styles.columns}>
        {Object.values(columns).map(col => (
          <ColumnTasks
            isDroppable={col.id == droppableId}
            title={col.id}
            list={col.list}
            key={col.id}/>
        ))}
      </div>
    </DragDropContext>
  )
};

export default Project;