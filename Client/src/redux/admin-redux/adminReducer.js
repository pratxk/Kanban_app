import { ADMIN_BOARDS_GET_FAILURE, ADMIN_BOARDS_GET_REQUEST, ADMIN_BOARDS_GET_SUCCESS,
     ADMIN_TASK_DELETE_FAILURE,
     ADMIN_TASK_DELETE_REQUEST,
     ADMIN_TASK_DELETE_SUCCESS,
     ADMIN_TASK_GET_FAILURE, ADMIN_TASK_GET_REQUEST, ADMIN_TASK_GET_SUCCESS, ADMIN_TASK_UPDATE_FAILURE, ADMIN_TASK_UPDATE_REQUEST, ADMIN_TASK_UPDATE_SUCCESS } from "./actionTypes";


const initialState = {
    isLoading: false,
    error: null,
    boards: null,
    deletedTask:null,
    tasks: [],
    totalPages: 1,
    currentPage: 1,
};
export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_TASK_DELETE_REQUEST:
            return { ...state, isLoading: true, error: null };
        case ADMIN_TASK_DELETE_SUCCESS:
            return { ...state, isLoading: false, error: null, deletedTask: action.payload };
        case ADMIN_TASK_DELETE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case ADMIN_BOARDS_GET_REQUEST:
            return { ...state, isLoading: true, error: null }
        case ADMIN_BOARDS_GET_SUCCESS:
            return { ...state, isLoading: false, error: null, boards: action.payload }
        case ADMIN_BOARDS_GET_FAILURE:
            return { ...state, isLoading: false, error: action.payload }
        case ADMIN_TASK_GET_REQUEST:
            return { ...state, isLoading: true, error: null };
        case ADMIN_TASK_GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                tasks: action.payload.tasks,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            };
        case ADMIN_TASK_GET_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case ADMIN_TASK_UPDATE_REQUEST:
            return { ...state, isLoading: true, error: null };
        case ADMIN_TASK_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                tasks: state.tasks.map(task =>
                    task._id === action.payload.taskId
                        ? { ...task, status: action.payload.status }
                        : task
                ),
            };
        case ADMIN_TASK_UPDATE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
