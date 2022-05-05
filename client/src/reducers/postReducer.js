import {
  FETCH_POST,
  FETCH_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  FETCH_POSTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT_POST,
} from "../actions/types";

const postReducer = (
  state = { isLoading: true, posts: [], post: null },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case FETCH_POSTS_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;

          return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;
