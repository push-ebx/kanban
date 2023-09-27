import {Dispatch, SetStateAction} from 'react';
import {Modal} from "@/shared/ui/modal";
import {Task} from "@/shared/api";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

type Props = {
  setModalActive: Dispatcher<boolean>,
  modalActive: boolean,
  task: Task
}

export const TaskModal = ({setModalActive, modalActive, task}: Props) => {
  return (
    <Modal
      handleClickClose={() => setModalActive(false)}
      handleClickOk={() => {}}
      active={modalActive}
      title={"title"}
    >
      <h3>{task.title}</h3>
      <div>Номер задачи: {task.id + 1}</div>
      <div>Дата создания: {task.date_create}</div>
      <div>Описание :{task.description}</div>
    </Modal>
  )
}