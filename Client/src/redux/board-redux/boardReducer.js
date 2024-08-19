import { BOARD_CREATION_FAILURE, BOARD_CREATION_REQUEST, BOARD_CREATION_SUCCESS, BOARD_GET_FAILURE, BOARD_GET_REQUEST, BOARD_GET_SUCCESS } from "./actionTypes"





const initialState = {
    isLoading: false,
    error: null,
    board: null,
    boards:null
}


export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOARD_CREATION_REQUEST:
            return { ...state, isLoading: true, error: null }
        case BOARD_CREATION_SUCCESS:
            return { ...state, isLoading: false, error: null, board: action.payload }
        case BOARD_CREATION_FAILURE:
            return { ...state, isLoading: false, error: action.payload }
        case BOARD_GET_REQUEST:
            return {...state, isLoading:true, error:null}
        case BOARD_GET_SUCCESS:
            return {...state, isLoading:false, error:null, boards:action.payload}
        case BOARD_GET_FAILURE:
            return {...state, isLoading:false, error:action.payload}
        default:
            return state
    }
}