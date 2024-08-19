import axios from "axios";
import { ADMIN_BOARDS_GET_FAILURE, ADMIN_BOARDS_GET_REQUEST, ADMIN_BOARDS_GET_SUCCESS, ADMIN_TASK_DELETE_FAILURE, ADMIN_TASK_DELETE_REQUEST, ADMIN_TASK_DELETE_SUCCESS, ADMIN_TASK_GET_FAILURE, ADMIN_TASK_GET_REQUEST, ADMIN_TASK_GET_SUCCESS, ADMIN_TASK_UPDATE_FAILURE, ADMIN_TASK_UPDATE_REQUEST, ADMIN_TASK_UPDATE_SUCCESS } from "./actionTypes";




export const adminGetTasks = (id, page = 1) => async (dispatch) => {
    dispatch({ type: ADMIN_TASK_GET_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(`http://localhost:5004/admin/view-task/${id}?page=${page}&limit=5`, config);
        if (response.status >= 200 && response.status < 300) {
            const { tasks, totalPages, currentPage } = response.data;
            dispatch({ type: ADMIN_TASK_GET_SUCCESS, payload: { tasks, totalPages, currentPage } });
        } else {
            dispatch({ type: TASK_GET_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: ADMIN_TASK_GET_FAILURE, payload: error });
    }
};


export const adminUpdateTaskStatus = (taskId, status) => async (dispatch) => {
    dispatch({ type: ADMIN_TASK_UPDATE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.put(`http://localhost:5004/admin/update-task/${taskId}`, { status }, config);
        if (response.status >= 200 && response.status < 300) {
            dispatch({ type: ADMIN_TASK_UPDATE_SUCCESS, payload: { taskId, status } });
        } else {
            dispatch({ type: ADMIN_TASK_UPDATE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: ADMIN_TASK_UPDATE_FAILURE, payload: error });
    }
};
export const adminDeleteTask = (taskId) => async (dispatch) => {
    dispatch({ type: ADMIN_TASK_DELETE_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.delete(`http://localhost:5004/admin/delete-task/${taskId}`, config);
        if (response.status >= 200 && response.status < 300) {
            dispatch({ type: ADMIN_TASK_DELETE_SUCCESS, payload: response.data });
        } else {
            dispatch({ type: ADMIN_TASK_DELETE_FAILURE, payload: response.data });
        }
    } catch (error) {
        dispatch({ type: ADMIN_TASK_DELETE_FAILURE, payload: error });
    }
};



export const adminGetBoards = () => async (dispatch) => {
    dispatch({ type: ADMIN_BOARDS_GET_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get('http://localhost:5004/admin/view-boards', config);
        if (response.status >= 200 && response.status < 300) {
            const boards = response.data;
            dispatch({ type: ADMIN_BOARDS_GET_SUCCESS, payload: boards });
            console.log('Fetch Successful');
        } else {
            dispatch({ type: ADMIN_BOARDS_GET_FAILURE, payload: response.data });
            console.error('Error fetching boards:', response.data);
        }

    } catch (error) {
        dispatch({ type: ADMIN_BOARDS_GET_FAILURE, payload: error});
        console.error('Error fetching boards:', error);
    }
}