import React, { useState } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { createComment, createLike } from "../redux/posts";

import "./Post.css";
import { getUser } from "../redux/user";

const CLASS = "Post";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [comment, setComment] = useState("");

  const postComment = () => {
    dispatch(
      createComment(post, {
        comment,
        date: moment().format(),
        userId: user?.id,
      })
    );
    setComment("");
  };

  const postLike = () =>
    dispatch(createLike(post, { date: moment().format(), userId: user?.id }));

  const { comments, likes } = post;

  const disabled = likes.find((item) => item?.userId === user?.id);
  return (
    <div className={CLASS}>
      <div className="likes">
        {likes.length}
        <button onClick={postLike} disabled={disabled}>
          post like
        </button>
      </div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className="new_comment">
        <textarea
          rows="4"
          cols="50"
          placeholder="Add you comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={postComment}>post comment</button>
      </div>

      {comments.map((item, key) => {
        return (
          <div key={key} className={"comment"}>
            <p>{item.comment}</p>
            <span>{moment(item.date).format("MM/DD/YYYY")}</span>
          </div>
        );
      })}
    </div>
  );
}
