import {
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILED,
  LIST_DEPARTMENT,
  LIST_DEPARTMENT_SUCCESS,
  LIST_DEPARTMENT_FAILED,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAILED
} from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  errorMessage: "",
  departmentList: {},
  departmentFetchData: {
    deleteepartment: false
  }
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case ADD_DEPARTMENT_SUCCESS: {
      console.log("ss",action.payload);
      return {
        ...state, 
        loader: false
      }      
    }

    case ADD_DEPARTMENT_FAILED: {
      return {
        ...state, 
        loader: false,
        errorMessage: action.error.message
      }      
    }

    case LIST_DEPARTMENT: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case LIST_DEPARTMENT_SUCCESS: {
      return {
        ...state, 
        loader: false,
        departmentList: action.payload
      }      
    }

    case LIST_DEPARTMENT_FAILED: {
      return {
        ...state, 
        loader: false,
        errorMessage: action.error.message
      }      
    }

    case DELETE_DEPARTMENT: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case DELETE_DEPARTMENT_SUCCESS: {
      return {
        ...state, 
        loader: false
      }      
    }

    case DELETE_DEPARTMENT_FAILED: {
      return {
        ...state, 
        loader: false,
        errorMessage: action.error.message
      }      
    }
    

    default:
      return state;
  }
}
