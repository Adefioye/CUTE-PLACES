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
} from "../actions/types";

const placeReducer = (
  state = { isLoading: true, places: [], place: null },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_PLACES:
      return {
        ...state,
        places: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_PLACE:
      return { ...state, place: action.payload };
    case FETCH_PLACES_BY_SEARCH:
      return { ...state, places: action.payload };
    case CREATE_PLACE:
      return { ...state, places: [...state.places, action.payload] };
    case UPDATE_PLACE:
    case LIKE_PLACE:
      return {
        ...state,
        places: state.places.map((place) =>
          place._id === action.payload._id ? action.payload : place
        ),
      };
    case COMMENT_PLACE:
      return {
        ...state,
        places: state.places.map((place) => {
          if (place._id === action.payload._id) return action.payload;

          return place;
        }),
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter((place) => place._id !== action.payload),
      };
    default:
      return state;
  }
};

export default placeReducer;
