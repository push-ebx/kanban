import { CSSProperties } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss'

type Props = {
  style?: CSSProperties,
  centered?: boolean
}

const Loader = ({style, centered}: Props) => {
  return (
    <div style={style} className={cn(styles.loader, { [styles.centered]: centered })} >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export {Loader};