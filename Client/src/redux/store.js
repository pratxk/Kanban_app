import {legacy_createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { authReducer } from './auth-redux/authReducer';
import { boardReducer } from './board-redux/boardReducer';
import { taskReducer } from './task-redux/taskReducer';
import { adminReducer } from './admin-redux/adminReducer';


const rootReducer = combineReducers({
    auth:authReducer,
    board:boardReducer,
    task:taskReducer,
    admin:adminReducer
})



export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));