import {
  CREATE_FILE_FOLDER,
  CREATE_FILE_FOLDER_SUCCESS,
  CREATE_FILE_FOLDER_FAILED,
  LIST_FILE_FOLDER,
  LIST_FILE_FOLDER_SUCCESS,
  LIST_FILE_FOLDER_FAILED,
  DELETE_FILE_FOLDER,
  DELETE_FILE_FOLDER_SUCCESS,
  DELETE_FILE_FOLDER_FAILED,
  EDIT_FILE_FOLDER,
  EDIT_FILE_FOLDER_SUCCESS,
  EDIT_FILE_FOLDER_FAILED
} from 'constants/ActionTypes';

const INIT_STATE = {
  loader: true,
  errorMessage: "",
  fileFolderList: [],
  myfilesFetchingIndicators: {
    createFileFolder: false,
    deleteFileFolder:false
  },
  myfilesFetchedIndicators: {
    createFileFolder: false,
    deleteFileFolder:false
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_FILE_FOLDER: {
      return {
        ...state, 
        loader: true,
        errorMessage: "",
        myfilesFetchingIndicators: {
          ...state.myfilesFetchingIndicators,
          createFileFolder: true
        },
        myfilesFetchedIndicators: {
          ...state.myfilesFetchingIndicators,
          createFileFolder: false
        }
      }      
    }

    case CREATE_FILE_FOLDER_SUCCESS: {
      return {
        ...state, 
        loader: false,
        myfilesFetchingIndicators: {
          ...state.myfilesFetchingIndicators,
          createFileFolder: false
        },
        myfilesFetchedIndicators: {
          ...state.myfilesFetchingIndicators,
          createFileFolder: true
        }
      }      
    }

    case CREATE_FILE_FOLDER_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message,
        myfilesFetchingIndicators: {
          ...state.myfilesFetchingIndicators,
          createFileFolder: false
        },
        myfilesFetchedIndicators: {
          ...state.myfilesFetchingIndicators,
          createFileFolder: false
        }
      }      
    }

    case LIST_FILE_FOLDER: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case LIST_FILE_FOLDER_SUCCESS: {
      return {
        ...state, 
        loader: false,
        fileFolderList: action.payload
      }      
    }

    case LIST_FILE_FOLDER_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message
      }      
    }

    case DELETE_FILE_FOLDER: {
      return {
        ...state, 
        loader: true,
        errorMessage: "",
        myfilesFetchingIndicators: {
          ...state.myfilesFetchingIndicators,
          deleteFileFolder: true
        },
        myfilesFetchedIndicators: {
          ...state.myfilesFetchingIndicators,
          deleteFileFolder: false
        }
      }      
    }

    case DELETE_FILE_FOLDER_SUCCESS: {
      return {
        ...state, 
        loader: false,
        myfilesFetchingIndicators: {
          ...state.myfilesFetchingIndicators,
          deleteFileFolder: false
        },
        myfilesFetchedIndicators: {
          ...state.myfilesFetchingIndicators,
          deleteFileFolder: true
        }
      }      
    }

    case DELETE_FILE_FOLDER_FAILED: {
      return {
        ...state, 
        loader: false,
        // errorMessage: action.error.message,
        myfilesFetchingIndicators: {
          ...state.myfilesFetchingIndicators,
          deleteFileFolder: false
        },
        myfilesFetchedIndicators: {
          ...state.myfilesFetchingIndicators,
          deleteFileFolder: false
        }
      }      
    }
    case EDIT_FILE_FOLDER: {
      return {
        ...state, 
        loader: true,
        errorMessage: ""
      }      
    }

    case EDIT_FILE_FOLDER_SUCCESS: {
      return {
        ...state, 
        loader: false
      }      
    }

    case EDIT_FILE_FOLDER_FAILED: {
      return {
        ...state, 
        loader: false
      }      
    }

    default:
      return state;
  }
}
