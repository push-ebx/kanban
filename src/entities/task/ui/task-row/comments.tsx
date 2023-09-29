import React from 'react';
import {Comment} from "@/shared/api";
import {useDispatch} from "react-redux";
import {addComment} from "@/entities/task/model/actionCreators.ts";

type CommentProps = {
  index_column: number;
  index_task: number;
} & Comment

const Comments = ({index_column, index_task, id, text, children } : CommentProps) => {
  const dispatch = useDispatch()

  return (
    <div style={{marginLeft: 20, borderLeft: '1px white solid', paddingLeft: 5}}>
      <span>{text}</span>
      <button onClick={() => {
        dispatch(addComment(id, 'text', index_task, index_column))
      }}
      >
        Add comment
      </button>

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