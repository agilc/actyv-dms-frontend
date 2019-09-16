import {
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILED,
  LIST_DEPARTMENT,
  LIST_DEPARTMENT_SUCCESS,
  LIST_DEPARTMENT_FAILED,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAILED,
  CHECKOUT_FILE,
  CHECKOUT_FILE_SUCCESS,
  CHECKOUT_FILE_FAILED,
  CHECKIN_FILE,
  CHECKIN_FILE_SUCCESS,
  CHECKIN_FILE_FAILED
} from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  errorMessage: "",
  departmentList: {},
  checkOutFile: null,
  departmentFetchData: {
    deleteDepartment: false,
    createDepartment: false,
    fileCheckOut: false,
    fileCheckIn: false
  }
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT: {
      return {
        ...state, 
        loader: true,
        errorMessage: "",
        departmentFetchData: {
          ...state.departmentFetchData,
          createDepartment: false
        }
      }      
    }

    case ADD_DEPARTMENT_SUCCESS: {
      return {
        ...state, 
        loader: false,
        departmentFetchData: {
          ...state.departmentFetchData,
          createDepartment: true
        }
      }      
    }

    case ADD_DEPARTMENT_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message,
        departmentFetchData: {
          ...state.departmentFetchData,
          createDepartment: false
        }
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
        // errorMessage: action.error.message
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
        // errorMessage: action.error.message
      }      
    }

    case CHECKOUT_FILE: {
      return {
        ...state, 
        loader: true,
        departmentFetchData: {
          ...state.departmentFetchData,
          fileCheckOut: false
        }
      }      
    }

    case CHECKOUT_FILE_SUCCESS: {
      return {
        ...state, 
        loader: false,
        checkOutFile: action.payload,
        departmentFetchData: {
          ...state.departmentFetchData,
          fileCheckOut: true
        }
      }      
    }

    case CHECKOUT_FILE_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message,
        departmentFetchData: {
          ...state.departmentFetchData,
          fileCheckOut: false
        }
      }      
    }

    case CHECKIN_FILE: {
      return {
        ...state, 
        loader: true,
        departmentFetchData: {
          ...state.departmentFetchData,
          fileCheckIn: false
        }
      }      
    }

    case CHECKIN_FILE_SUCCESS: {
      return {
        ...state, 
        loader: false,
        departmentFetchData: {
          ...state.departmentFetchData,
          fileCheckIn: true
        }
      }      
    }

    case CHECKIN_FILE_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message,
        departmentFetchData: {
          ...state.departmentFetchData,
          fileCheckIn: false
        }
      }      
    }
    

    default:
      return state;
  }
}
