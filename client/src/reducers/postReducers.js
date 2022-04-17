import { FETCH_ALL_POSTS, CREATE_POST } from "../actions/types";

const postReducers = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return action.payload;
    case CREATE_POST:
      return [...posts, action.payload];
    default:
      return posts;
  }
};

export default postReducers;
