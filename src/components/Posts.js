import React from "react";

import Post from "./Post";

export default function Posts({ posts }) {
  return (
    <div>
      {posts.length
        ? posts.map((item, key) => {
            return <Post key={key} post={item} />;
          })
        : "No posts available"}
    </div>
  );
}
