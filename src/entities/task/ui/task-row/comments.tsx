import React, {useState} from 'react';
import {Comment} from "@/shared/api";
import {useDispatch} from "react-redux";
import {addComment} from "@/entities/task/model/actionCreators.ts";
import {Input} from "@/shared/ui/input";

type CommentProps = {
  index_column: number;
  index_task: number;
} & Comment

const Comments = ({index_column, index_task, id, text, children } : CommentProps) => {
  const dispatch = useDispatch()
  const [isReply, setIsReply] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div style={{marginLeft: 20, borderLeft: '1px white solid', paddingLeft: 5}}>
      <div>{text}</div>
      <button onClick={() => {
        setIsReply(prev => !prev)
      }}
      >
        {isReply ? 'Cancel': 'Add comment'}
      </button>

      {
        isReply &&
        <div>
          <Input value={inputValue} placeholder={"Comment..."} onChange={setInputValue}/>
          <button
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