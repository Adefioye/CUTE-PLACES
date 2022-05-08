import axios from "axios";

import { AUTH } from "./types";

const API = axios.create({
  baseURL: "https://radiant-hamlet-16591.herokuapp.com",
});

// http://localhost:5000
// https://radiant-hamlet-16591.herokuapp.com

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const response = await API.post("/user/signUp", formData);

    dispatch({ type: AUTH, payload: response.data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const response = await API.post("/user/signIn", formData);

    dispatch({ type: AUTH, payload: response.data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
