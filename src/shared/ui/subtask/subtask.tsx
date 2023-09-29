import styles from './styles.module.scss'

const Subtask = ({text}) => {
  return (
    <div className={styles.subtask}>
      {text}
    </div>
  );
};

export {Subtask};