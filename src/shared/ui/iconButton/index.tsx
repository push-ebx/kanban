import styles from './styles.module.scss'

type Props = {
  src: string,
  alt?: string,
  onClick?: () => void,
  className?: string,
}

export const IconButton = ({src, alt, onClick, className}: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    />
  );
};