import axios from "axios";

import {
  FETCH_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
} from "./types";

const URL = "http://localhost:5000/posts";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(URL);

    dispatch({ type: FETCH_ALL_POSTS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const response = await axios.post(URL, newPost);

    dispatch({ type: CREATE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const response = await axios.patch(`${URL}/${id}`, updatedPost);

    dispatch({ type: UPDATE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const response = await axios.patch(`${URL}/${id}/likePost`);

    dispatch({ type: LIKE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
