import axios from "axios";

import {
  FETCH_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
} from "./types";

const API = axios.create({ baseURL: "http://localhost:5000" });

// const URL = "http://localhost:5000/posts";
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getPosts = () => async (dispatch) => {
  try {
    const response = await API.get("/posts");

    dispatch({ type: FETCH_ALL_POSTS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const response = await API.post("/posts", newPost);

    dispatch({ type: CREATE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const response = await API.patch(`/posts/${id}`, updatedPost);

    dispatch({ type: UPDATE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await API.delete(`/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const response = await API.patch(`/posts/${id}/likePost`);

    dispatch({ type: LIKE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
