import axios from "axios"
import { BOARD_CREATION_FAILURE, BOARD_CREATION_REQUEST, BOARD_CREATION_SUCCESS, BOARD_GET_FAILURE, BOARD_GET_REQUEST, BOARD_GET_SUCCESS } from "./actionTypes"

export const createBoard = (data) => async (dispatch) => {
    dispatch({ type: BOARD_CREATION_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.post('https://kanban-app-loz7.onrender.com/boards/add-board', data, config);
        if (response.status >= 200 && response.status < 300) {
            const board = response.data;
            dispatch({ type: BOARD_CREATION_SUCCESS, payload: board });
            console.log(board);
            alert('Successful');
        } else {
            dispatch({ type: BOARD_CREATION_FAILURE, payload: response.data });
            console.error('Error creating board:', response.data);
        }
    } catch (error) {
        dispatch({ type: BOARD_CREATION_FAILURE, payload: error });
        console.error('Error creating board:', error);
    }
};


export const getBoard = () => async (dispatch) => {
    dispatch({ type: BOARD_GET_REQUEST });
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get('https://kanban-app-loz7.onrender.com/boards/view', config);
        if (response.status >= 200 && response.status < 300) {
            const boards = response.data;
            dispatch({ type: BOARD_GET_SUCCESS, payload: boards });
            console.log('Fetch Successful');
        } else {
            dispatch({ type: BOARD_GET_FAILURE, payload: response.data });
            console.error('Error fetching boards:', response.data);
        }

    } catch (error) {
        dispatch({ type: BOARD_GET_FAILURE, payload: error});
        console.error('Error fetching boards:', error);
    }
}