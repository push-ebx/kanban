import styles from './styles.module.scss'
import {priority} from "@/shared/api";
import cn from "classnames"

type Props = {
  priority: priority
}

export const Priority = ({priority}: Props) => {
  return (
    <div
      className={cn(styles.priority, styles[priority])}
    >
      {priority}
    </div>
  );
};