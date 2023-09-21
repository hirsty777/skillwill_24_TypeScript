import { createAsyncThunk  } from "@reduxjs/toolkit";
import { IgetTodo, IpostTodo } from "../../interfaces/todoInterface";



export const getTodo = createAsyncThunk<IgetTodo[],undefined,{}>(
    "todo/get",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`/api/v1/todolist`,{
                headers:{
                    "Content-type":"aplication/json",
                    "Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`
                }
            })
            const data = await res.json()
            if(data) return thunkAPI.fulfillWithValue(data.items)
        }
        catch (error) {
            return thunkAPI.rejectWithValue("error" )
        }
    }
)

export const postTodo = createAsyncThunk<IgetTodo[],IgetTodo[],{}>(
    "todo/post",
    async (payload, thunkAPI) => {
        try {
            const res = await fetch(`/api/v1/todolist`,{
                method:"POST",
                headers:{
                    "Content-type":"aplication/json",
                    "Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`
                },
                body:payload? JSON.stringify(payload) : undefined
            })
            const data = await res.json()
            if(data) return thunkAPI.fulfillWithValue(data.items) 
        } catch (error) {
            return thunkAPI.rejectWithValue("error")
        }
    }
)

export const changeTodo = createAsyncThunk<IgetTodo,IpostTodo,{}>(
    "todo/put",
    async (payload, thunkAPI) => {

        try {
            const res = await fetch(`/api/v1/todolist/${payload._uuid}`,{
                method:"PUT",
                headers:{
                    "Content-type":"aplication/json",
                    "Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`
                },
                body: JSON.stringify({...payload, isCompleted:!payload.isCompleted})
            })
            const data = await res.json()
            if(data) return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue("error")
        }
    }
)

export const deletedTodo = createAsyncThunk<IgetTodo,IpostTodo,{}>(
    "todo/delete",
    async (payload, thunkAPI) => {
        try {
            const res = await fetch(`/api/v1/todolist/${payload._uuid}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"aplication/json",
                    "Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`
                },
            })
            const data = await res.json()
            if(data) return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue("error")
        }
    }
)