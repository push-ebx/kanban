import React, {Dispatch, SetStateAction, useState} from 'react';
import {Modal} from "@/shared/ui/modal";
import {Task} from "@/shared/api";
import moment from "moment";
import {Input} from "@/shared/ui/input";
import {Comments} from "@/entities/task/ui/task-row/task-comment";
import {Subtask} from "@/shared/ui/subtask/subtask.tsx";
import styles from "./styles.module.scss"

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

type Props = {
  setModalActive: Dispatcher<boolean>,
  modalActive: boolean,
  task: Task,
  handleChangePriority: (value: string) => void,
  handleChangeTitleTask: (value: string) => void,
  handleChangeDescriptionTask: (value: string) => void,
  handleNewSubtask: (value, subtask: string) => void,
  handleDeleteTask: () => void,
  handleDeleteSubtask: (i: number) => void,
  index_column: number,
  index_task: number,
}

export const TaskModal = ({handleChangeDescriptionTask,
                            handleChangeTitleTask,
                            handleChangePriority,
                            handleDeleteTask,
                            setModalActive,
                            modalActive,
                            task,
                            index_column,
                            index_task,
                            handleNewSubtask,
                            handleDeleteSubtask
                          }: Props) => {

  const [subtask, setSubtask] = useState('')

  return (
    <Modal
      handleClickClose={() => setModalActive(false)}
      handleClickOk={() => {}}
      active={modalActive}
      title={`Task ${task.id}`}
      className={styles.modal}
    >
      <Input
        value={task.titleTask}
        placeholder={"Task"}
        onChange={value => handleChangeTitleTask(value)}
        className={styles.input}
      />
      <textarea
        value={task.description}
        placeholder={"Description"}
        onChange={e => {
          handleChangeDescriptionTask(e.target.value)
        }}
        className={styles.description}
      />
      <div className={styles.property}>Date and time of creation:
        <span>{task.date_create}</span>
      </div>
      <div className={styles.property}>Working time:
        <span>{moment(task.date_create, "DD.MM.YY hh:mm a").fromNow()}</span>
      </div>
      <div className={styles.property}>Current status:
        <span>{task.status}</span>
      </div>

      <div className={styles.priority}>
        <label className={styles.property} htmlFor="priority-select">Priority: </label>
        <select
          name="prioritets"
          id="priority-select"
          onChange={e => handleChangePriority(e.target.value)}
        >
          <option selected={task.priority === "Low"} value="Low">Low</option>
          <option selected={task.priority === "Medium"} value="Medium">Medium</option>
          <option selected={task.priority === "Height"} value="Height">Height</option>
        </select>
      </div>

      <div className={styles.delete} onClick={handleDeleteTask}>Delete task</div>

      <div className={styles.subtasks}>
        {
          task.subtasks.map((sub, i) => <Subtask
            key={i}
            text={sub.text}
            onclick={() => handleDeleteSubtask(i)}
          />)
        }
      </div>

      <Input
        value={subtask}
        onChange={setSubtask}
        onKeyDownHandler={e => {
          handleNewSubtask(e, subtask);
          (e.key === 'Enter' || e.code === 'NumpadEnter') && setSubtask("");
        }}
        placeholder={"New subtask"}
      />

      <Comments
        index_column={index_column}
        index_task={index_task}
        id={task.comments.id}
        children={task.comments.children}
        text={task.comments.text}
      />
    </Modal>
  )
}