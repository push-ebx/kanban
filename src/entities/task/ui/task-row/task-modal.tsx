import React, {Dispatch, SetStateAction, useState} from 'react';
import {Modal} from "@/shared/ui/modal";
import {Task} from "@/shared/api";
import moment from "moment";
import {Input} from "@/shared/ui/input";
import {Comments} from "@/entities/task/ui/task-row/comments.tsx";
import {Subtask} from "@/entities/task/ui/task-row/subtask.tsx";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

type Props = {
  setModalActive: Dispatcher<boolean>,
  modalActive: boolean,
  task: Task,
  handleChangePriority: (value: string) => void,
  handleChangeTitleTask: (value: string) => void,
  handleChangeDescriptionTask: (value: string) => void,
  handleNewSubtask: (value, subtask: string) => void,
  index_column: number,
  index_task: number,
}

export const TaskModal = ({handleChangeDescriptionTask,
                            handleChangeTitleTask,
                            handleChangePriority,
                            setModalActive,
                            modalActive,
                            task,
                            index_column,
                            index_task,
                            handleNewSubtask
                          }: Props) => {

  const [subtask, setSubtask] = useState('')

  return (
    <Modal
      handleClickClose={() => setModalActive(false)}
      handleClickOk={() => {}}
      active={modalActive}
      title={"title"}
    >
      <Input
        value={task.titleTask}
        placeholder={"Task"}
        onChange={value => handleChangeTitleTask(value)}
      />
      <Input
        value={task.description}
        placeholder={"Description"}
        onChange={value => handleChangeDescriptionTask(value)}
      />
      <div>Номер задачи: {task.id + 1}</div>
      <div>Дата и время создания: {task.date_create}</div>
      <div>Время в работе: {moment(task.date_create, "DD.MM.YY hh:mm a").fromNow()}</div>
      <div>Текущий статус: {task.status}</div>

      <label htmlFor="priority-select">Приоритет: </label>
      <select
        name="prioritets"
        id="priority-select"
        onChange={e => handleChangePriority(e.target.value)}
      >
        <option selected={task.priority === "Low"} value="low">Low</option>
        <option selected={task.priority === "Medium"} value="medium">Medium</option>
        <option selected={task.priority === "Height"} value="height">Height</option>
      </select>

      <Comments
        index_column={index_column}
        index_task={index_task}
        id={task.comments.id}
        children={task.comments.children}
        text={task.comments.text}
      />

      {
        task.subtasks.map((sub, i) => <Subtask key={i} text={sub.text} />)
      }

      <Input
        value={subtask}
        onChange={setSubtask}
        onKeyDownHandler={e => {
          handleNewSubtask(e, subtask);
          (e.key === 'Enter' || e.code === 'NumpadEnter') && setSubtask("");
        }}
        placeholder={"New subtask"}
      />
    </Modal>
  )
}