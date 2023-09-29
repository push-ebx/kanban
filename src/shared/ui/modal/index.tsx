import { ReactNode } from 'react';
import style from './style.module.scss'
import { Button } from '../button';
import CrossIcon from "./x.svg"

type Props = {
  className?: string,
  children?: ReactNode,
  active: boolean,
  handleClickOk?: () => void,
  handleClickClose?: () => void,
  title?: string
}

export const Modal = ({className,
                        children,
                        active,
                        handleClickOk,
                        handleClickClose,
                        title}: Props) => {

  return (
    <div
      className={`${style.modal} ${active ? style.active : ''}`}
      onClick={() => handleClickClose()}
    >
      <div
        className={`${style.content}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <span className={style.title}>{title}</span>
          <img
            src={CrossIcon}
            className={style.cross}
            onClick={() => handleClickClose()}
          />
        </header>
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  );
};