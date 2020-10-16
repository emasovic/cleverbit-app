import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { userComments, userLikes } from "../redux/user";
import { loadPosts, selectPosts } from "../redux/posts";

import Posts from "../components/Posts";

import "./PostsPage.css";

function PostsPage() {
  const dispatch = useDispatch();
  const { comments, likes, posts } = useSelector((state) => ({
    comments: userComments(state),
    likes: userLikes(state),
    posts: selectPosts(state),
  }));
  
  const getPosts = () => dispatch(loadPosts());
  return (
    <div className="PostsPage">
      <div className="stats">
        <button onClick={getPosts}>Load posts</button>
        <span>comments: {comments.length} </span>
        <span>likes: {likes.length}</span>
      </div>
      <Posts posts={posts} />
    </div>
  );
}

export default PostsPage;
