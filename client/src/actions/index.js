import axios from "axios";

import { FETCH_ALL_POSTS, CREATE_POST } from "./types";

const URL = "http://localhost:5000/posts";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(URL);

    dispatch({ type: FETCH_ALL_POSTS, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const response = await axios.post(URL, newPost);

    dispatch({ type: CREATE_POST, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};
