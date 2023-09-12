import {
  CREATE_NOTES_ERROR,
  CREATE_NOTES_SUCCESS,
  CREATE_NOTES_LOADING,
  DELETE_NOTES_ERROR,
  DELETE_NOTES_LOADING,
  DELETE_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  GET_NOTES_LOADING,
  GET_NOTES_SUCSESS,
  UPDATE_NOTES_ERROR,
  UPDATE_NOTES_SUCCESS,
  UPDATE_NOTES_LOADING,
} from "./noteType";

let initialState = {
  loading: false,
  error: false,
  data: [],
};

export const noteReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_NOTES_SUCSESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case GET_NOTES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case CREATE_NOTES_LOADING:
      {
        return {
          ...state,
          loading: true,
        };
      }
      CREATE_NOTES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          data: payload,
        };
      }

    case CREATE_NOTES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case UPDATE_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case UPDATE_NOTES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case DELETE_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case DELETE_NOTES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};
