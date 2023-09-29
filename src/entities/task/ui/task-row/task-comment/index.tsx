import React, {useState} from 'react';
import {Comment} from "@/shared/api";
import {useDispatch} from "react-redux";
import {addComment} from "@/entities/task/model/actionCreators.ts";
import {Input} from "@/shared/ui/input";
import styles from "./styles.module.scss"

type CommentProps = {
  index_column: number;
  index_task: number;
} & Comment

const Comments = ({index_column, index_task, id, text, children } : CommentProps) => {
  const dispatch = useDispatch()
  const [isReply, setIsReply] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className={styles.comments}>
      <div className={styles.add_btn_text}>
        <div>{text}</div>
        <button
          className={styles.button}
          onClick={() => {
            setIsReply(prev => !prev)
          }}
        >
          {isReply ? 'Cancel': 'Add comment'}
        </button>
      </div>

      {
        isReply &&
        <div className={styles.newComment}>
          <Input
            className={styles.input}
            value={inputValue}
            placeholder={"Comment..."}
            onChange={setInputValue}
          />
          <button
            className={styles.button}
            onClick={() => {
              if (!inputValue.trim()) return

              setInputValue('')
              setIsReply(false)
              dispatch(addComment(id, inputValue, index_task, index_column))
            }}
          >
            Send
          </button>
        </div>
      }

      {
        children.length ?
        children.map(comment =>
          <Comments
            index_column={index_column}
            index_task={index_task}
            id={comment.id}
            text={comment.text}
            children={comment.children}
            key={comment.id}
          />
        ) : ''
      }
    </div>
  );
};

export {Comments};