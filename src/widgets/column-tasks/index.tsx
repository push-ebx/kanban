import {TaskRow} from '@/entities/task'
import {Droppable} from 'react-beautiful-dnd'
import styles from './styles.module.scss'
import cn from "classnames"
import {Button} from "@/shared/ui/button";
import {Column} from "@/shared/api";

type ColumnTasksProps = {
  isDroppable?: boolean
  newTask: (title: string) => void
} & Column

const ColumnTasks = ({ list, title, isDroppable, newTask }: ColumnTasksProps) => {
  return (
    <Droppable droppableId={title}>
      {provided => (
        <div className={styles.column}>
          <h2>{title}</h2>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(styles.taskList, { [styles.isDroppable]: isDroppable })}
          >
            {list.map((task, index) => (
              <TaskRow key={task.id} id={task.id} title={task.title} index={index} />
            ))}
            {provided.placeholder}
            <Button onClick={() => newTask(title)}>+ New</Button>
          </div>
        </div>
      )}
    </Droppable>
  )
}

export {ColumnTasks}