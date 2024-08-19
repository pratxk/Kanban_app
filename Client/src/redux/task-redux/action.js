import axios from "axios";
import {
    TASK_CREATION_FAILURE, TASK_CREATION_REQUEST, TASK_CREATION_SUCCESS,
    TASK_GET_FAILURE, TASK_GET_REQUEST, TASK_GET_SUCCESS,
    TASK_UPDATE_FAILURE, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS
} from "./actionTypes";

export const createTask = (data) => async (dispatch) => {
    dispatch({ type: TASK_CREATION_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        const response = await axios.post('http://localhost:5004/tasks/add', data, config);
        if (response.status >= 200 && response.status < 300) {
            const task = response.data;
            dispatch({ type: TASK_CREATION_SUCCESS, payload: task });
            alert('Task created successfully');
        } else {
            dispatch({ type: TASK_CREATION_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: TASK_CREATION_FAILURE, payload: error });
    }
};

export const getTasks = (id, page = 1) => async (dispatch) => {
    dispatch({ type: TASK_GET_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(`http://localhost:5004/tasks/view/${id}?page=${page}&limit=5`, config);
        if (response.status >= 200 && response.status < 300) {
            const { tasks, totalPages, currentPage } = response.data;
            dispatch({ type: TASK_GET_SUCCESS, payload: { tasks, totalPages, currentPage } });
        } else {
            dispatch({ type: TASK_GET_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: TASK_GET_FAILURE, payload: error });
    }
};


export const updateTaskStatus = (taskId, status) => async (dispatch) => {
    dispatch({ type: TASK_UPDATE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.put(`http://localhost:5004/tasks/update/${taskId}`, { status }, config);
        if (response.status >= 200 && response.status < 300) {
            dispatch({ type: TASK_UPDATE_SUCCESS, payload: { taskId, status } });
        } else {
            dispatch({ type: TASK_UPDATE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: TASK_UPDATE_FAILURE, payload: error });
    }
};
