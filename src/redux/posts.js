import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { createdComment, createdLike } from "./user";

const POSTS = [
  {
    id: 1,
    title: "End Sars: Hated Nigerian police unit founder feels guilty",
    description:
      'The man who set up the hated Nigerian police unit, Sars, accused of human rights abuses has told the BBC that he feels "sad" and "guilty" about what the agency has become.',
    comments: [],
    likes: [],
  },
  {
    id: 2,
    title: "Fukushima: Japan to release contaminated water into sea",
    description:
      "Japan is to release treated radioactive water from the destroyed Fukushima nuclear plant into the sea, media reports say.",
    comments: [],
    likes: [],
  },
  {
    id: 3,
    title:
      "Salvador Cienfuegos Zepeda: Mexico`s ex-defence minister arrested in the US",
    description:
      "A former Mexican defence minister has been arrested in the US.",
    comments: [],
    likes: [],
  },
  {
    id: 4,
    title: "Coronavirus: France reports more than 30,000 new infections",
    description:
      "France has reported a large jump in new Covid-19 cases ahead of a night-time curfew being imposed on Paris and eight other cities on Saturday.",
    comments: [],
    likes: [],
  },
];

const postAdapter = createEntityAdapter({
  selectId: (entity) => entity.id,
});

export const postSlice = createSlice({
  name: "posts",
  initialState: postAdapter.getInitialState({
    op: null,
    loading: null,
  }),
  reducers: {
    postsReceieved: (state, action) => {
      postAdapter.setAll(state, action.payload);
      state.loading = false;
      state.op = null;
    },
    postsUpsertMany: (state, action) => {
      postAdapter.upsertMany(state, action.payload);
      state.loading = null;
      state.op = null;
    },
    postUpsert: (state, action) => {
      postAdapter.upsertOne(state, action.payload);
      state.op = null;
      state.loading = null;
    },
    gotComment: (state, action) => {
      const { postId, comment } = action.payload;
      state.entities[postId].comments.push(comment);
      state.op = null;
    },
    gotLike: (state, action) => {
      const { postId, like } = action.payload;
      state.entities[postId].likes.push(like);
      state.op = null;
    },
    removeLike: (state, action) => {
      const { postId, likeId } = action.payload;
      state.entities[postId] = {
        ...state.entities[postId],
        likes: state.entities[postId].likes.filter((l) => l.id !== likeId),
      };
      state.op = null;
    },
    opStart: (state, action) => {
      state.op = action.payload;
    },
    opEnd: (state) => {
      state.op = null;
    },
    loadingStart: (state) => {
      state.loading = true;
    },
    loadingEnd: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loadingStart,
  opStart,
  opEnd,
  loadingEnd,
  postsReceieved,
  postsUpsertMany,
  postUpsert,
  gotComment,
  gotLike,
  removeComment,
  removeLike,
} = postSlice.actions;

export const loadPosts = () => (dispatch, getState) => {
  return dispatch(postsUpsertMany(POSTS));
};

export const createComment = (post, comment) => (dispatch, getState) => {
  dispatch(createdComment({ ...comment, title: post.title }));
  return dispatch(gotComment({ postId: post.id, comment }));
};
export const createLike = (post, like) => (dispatch, getState) => {
  dispatch(createdLike(like));
  return dispatch(gotLike({ postId: post.id, like }));
};

//SELECTORS

const postSelector = postAdapter.getSelectors((state) => state.posts);

export const selectPosts = (state) => postSelector.selectAll(state);

export const selectPost = (state, id) => postSelector.selectById(state, id);

export default postSlice.reducer;
