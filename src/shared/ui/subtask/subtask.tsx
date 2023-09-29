import styles from './styles.module.scss'

const Subtask = ({text, onclick}) => {
  return (
    <div onClick={onclick} className={styles.subtask}>
      {text}
    </div>
  );
};

export {Subtask};