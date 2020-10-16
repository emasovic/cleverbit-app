import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";
import user from "./user";

export default configureStore({
  reducer: {
    posts,
    user,
  },
});
