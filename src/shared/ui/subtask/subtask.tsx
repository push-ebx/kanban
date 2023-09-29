import styles from './styles.module.scss'

type SubtaskProps = {
  text: string,
  onclick?: () => void
}

const Subtask = ({text, onclick}: SubtaskProps) => {
  return (
    <div onClick={onclick} className={styles.subtask}>
      {text}
    </div>
  );
};

export {Subtask};