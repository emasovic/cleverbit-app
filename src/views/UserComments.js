import React from "react";
import { useSelector } from "react-redux";

import { userComments } from "../redux/user";

export default function UserComments() {
  const comments = useSelector(userComments);

  return (
    <div>
      {comments.map((item, key) => (
        <div key={key}>
          <p>comment: {item.comment}</p>
          <p>title: {item.title}</p>
        </div>
      ))}
    </div>
  );
}
