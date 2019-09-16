import {
  LIST_CATEGORIES,
  LIST_CATEGORIES_SUCCESS,
  LIST_CATEGORIES_FAILED,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED
} from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  errorMessage: "",
  categoryList: []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_CATEGORIES: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case LIST_CATEGORIES_SUCCESS: {
      return {
        ...state, 
        loader: false,
        categoryList: action.payload
      }      
    }

    case LIST_CATEGORIES_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message
      }      
    }

    case ADD_CATEGORY: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case ADD_CATEGORY_SUCCESS: {
      return {
        ...state, 
        loader: false
      }      
    }

    case ADD_CATEGORY_FAILED: {
      return {
        ...state, 
        loader: true,
        // errorMessage: action.error.message
      }      
    }

    case EDIT_CATEGORY: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case EDIT_CATEGORY_SUCCESS: {
      return {
        ...state, 
        loader: false
      }      
    }

    case EDIT_CATEGORY_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.payload.message
      }      
    }

    case DELETE_CATEGORY: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case DELETE_CATEGORY_SUCCESS: {
      return {
        ...state, 
        loader: false
      }      
    }

    case DELETE_CATEGORY_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.payload.message
      }      
    }

    default:
      return state;
  }
}
