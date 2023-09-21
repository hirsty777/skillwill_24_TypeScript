import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoReducer from "./todo/todo.slice";


const rootReducer = combineReducers({
    todo:todoReducer
})

export const store = configureStore({
    reducer:rootReducer,
})


export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch:() => AppDispatch = useDispatch

