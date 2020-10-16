import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      id: 1,
      username: "user",
    },
    comments: [],
    likes: [],
  },
  reducers: {
    createdComment: (state, action) => {
      state.comments.push(action.payload);
    },
    createdLike: (state, action) => {
      state.likes.push(action.payload);
    },
  },
});

export const { createdComment, createdLike } = userSlice.actions;

export const userComments = (state) => state.user.comments;
export const userLikes = (state) => state.user.likes;
export const getUser = (state) => state.user.data;

export default userSlice.reducer;
