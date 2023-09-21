import { createSlice } from "@reduxjs/toolkit"
import { AppState } from ".."
import { IinitialState } from "../../interfaces/todoInterface"
import { changeTodo, deletedTodo, getTodo, postTodo,  } from "./todo.thunks"


const initialState:IinitialState = {
    todoList:[],
    getloader:false,
    postloader:false,
    putloader:false,
    deleteloader:false,
    error:false,
    colorMode:true,
    lightMode:{ 
        background:{"--background-color":"#eeeeee"},
        textColor:{"--text-color":"#030302"}
    },
    darkMode:{ 
        background:{"--background-color":"linear-gradient(60deg, #29323c 0%, #485563 100%)"},
        textColor:{"--text-color":"#ffffff"}
    }
}

const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        changeMode:(state) =>{
            state.colorMode = !state.colorMode
        }
    },
    extraReducers:(builder) => {
        builder//👇GET============================
        .addCase(getTodo.pending, (state)=>{
            state.getloader = true
        })
        .addCase(getTodo.fulfilled, (state, action)=>{
            state.getloader = false
            state.todoList = action.payload
        })
        .addCase(getTodo.rejected, (state)=>{
            state.getloader = false
            state.error = true
        })//👇POST=================================
        .addCase(postTodo.pending, (state)=>{
            state.postloader = true
        })
        .addCase(postTodo.fulfilled, (state, action)=>{
            state.postloader = false
            state.todoList.push(action.payload[0])
        })
        .addCase(postTodo.rejected, (state)=>{
            state.postloader = false
            state.error = true
        })//👇PUT=================================
        .addCase(changeTodo.pending, (state)=>{
            state.putloader = true
        })
        .addCase(changeTodo.fulfilled, (state, action)=>{
            state.putloader = false
            const TodoIndex = state.todoList.findIndex((todo) => todo._uuid === action.payload._uuid) 
            state.todoList[TodoIndex].isCompleted = action.payload.isCompleted
        })
        .addCase(changeTodo.rejected, (state)=>{
            state.putloader = false
        })//👇DELETE================================
        .addCase(deletedTodo.pending, (state)=>{
            state.deleteloader = true
        })
        .addCase(deletedTodo.fulfilled, (state, action)=>{
            state.deleteloader = false
            state.todoList = state.todoList.filter(todo => todo._uuid !== action.payload._uuid)
        })
        .addCase(deletedTodo.rejected, (state)=>{
            state.deleteloader = false
        })

    } 
})

export const changeMode = todoSlice.actions.changeMode

export const todoSelector = (state:AppState )=> state.todo.todoList
export const colorModeSelector = (state:AppState) => state.todo.colorMode
export const lightModeSelector = (state:AppState) => state.todo.lightMode
export const darkModeSelector = (state:AppState) => state.todo.darkMode
export const errorSelector = (state:AppState) => state.todo.error
export const getLoaderSelector = (state:AppState) => state.todo.getloader
export const deleteLoaderSelector = (state:AppState) => state.todo.deleteloader


export default todoSlice.reducer