import axios from "axios";

import {
  FETCH_PLACE,
  FETCH_ALL_PLACES,
  CREATE_PLACE,
  UPDATE_PLACE,
  DELETE_PLACE,
  LIKE_PLACE,
  FETCH_PLACES_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT_PLACE,
} from "./types";

const API = axios.create({ baseURL: "http://localhost:5000" });

// const URL = "http://localhost:5000/places";
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getPlace = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const response = await API.get(`/places/${id}`);

    dispatch({ type: FETCH_PLACE, payload: response.data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPlaces = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const response = await API.get(`/places?page=${page}`);

    dispatch({ type: FETCH_ALL_PLACES, payload: response.data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPlacesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const response = await API.get(
      `/places/search?searchQuery=${searchQuery.search || "none"}&tags=${
        searchQuery.tags
      }`
    );

    dispatch({ type: FETCH_PLACES_BY_SEARCH, payload: response.data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPlace = (newPlace, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const response = await API.post("/places", newPlace);

    history.push(`/places/${response.data._id}`);

    dispatch({ type: CREATE_PLACE, payload: response.data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlace = (id, updatedPlace) => async (dispatch) => {
  try {
    const response = await API.patch(`/places/${id}`, updatedPlace);

    dispatch({ type: UPDATE_PLACE, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlace = (id) => async (dispatch) => {
  try {
    await API.delete(`/places/${id}`);

    dispatch({ type: DELETE_PLACE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePlace = (id) => async (dispatch) => {
  try {
    const response = await API.patch(`/places/${id}/likePlace`);

    dispatch({ type: LIKE_PLACE, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPlace = (value, id) => async (dispatch) => {
  try {
    const response = await API.post(`/places/${id}/commentPlace`, { value });

    dispatch({ type: COMMENT_PLACE, payload: response.data });

    return response.data.comments;
  } catch (error) {
    console.log(error);
  }
};
