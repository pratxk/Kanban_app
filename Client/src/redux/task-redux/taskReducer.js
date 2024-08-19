import {
    TASK_CREATION_FAILURE, TASK_CREATION_REQUEST, TASK_CREATION_SUCCESS,
    TASK_GET_FAILURE, TASK_GET_REQUEST, TASK_GET_SUCCESS,
    TASK_UPDATE_FAILURE, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS
} from "./actionTypes";

const initialState = {
    isLoading: false,
    error: null,
    tasks: [],
    totalPages: 1,
    currentPage: 1,
};
export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_CREATION_REQUEST:
            return { ...state, isLoading: true, error: null };
        case TASK_CREATION_SUCCESS:
            return { ...state, isLoading: false, error: null, task: action.payload };
        case TASK_CREATION_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case TASK_GET_REQUEST:
            return { ...state, isLoading: true, error: null };
        case TASK_GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                tasks: action.payload.tasks,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            };
        case TASK_GET_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case TASK_UPDATE_REQUEST:
            return { ...state, isLoading: true, error: null };
        case TASK_UPDATE_SUCCESS:
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
        case TASK_UPDATE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
