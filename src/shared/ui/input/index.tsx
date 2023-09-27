import React from 'react';
import styles from './styles.module.scss'

type Props = {
  placeholder?: string,
  className?: string,
  onChange?: (value: string) => void,
  value?: string,
  inputRef?: React.Ref<HTMLInputElement>,
  onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

export const Input = ({onKeyDownHandler, inputRef, placeholder, className, onChange, value}: Props) => {
  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      type="text"
      onChange={e => onChange(e.target.value)}
      value={value}
      onKeyDown={onKeyDownHandler}
    />
  );
};