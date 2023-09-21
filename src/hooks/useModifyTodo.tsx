import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { errorSelector, getLoaderSelector, todoSelector} from "../store/todo/todo.slice"
import { changeTodo, deletedTodo } from "../store/todo/todo.thunks"
import { IgetTodo } from "../interfaces/todoInterface"
import { useAppDispatch } from "../store"
import Style from "../styles/components/TodoList.module.css"



const useModifyTodo = (isCopleted:boolean) => {
    const todoList = useSelector(todoSelector)
    const error = useSelector(errorSelector)
    const getloader = useSelector(getLoaderSelector)
    const [todoFiltered, setTodoFiltered] = useState<IgetTodo[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        setTodoFiltered(todoList.filter(todo => todo.isCompleted === isCopleted))
    },[todoList, isCopleted])

    const changeCompleteStatus = (todo:IgetTodo) => {
        dispatch(changeTodo(todo))
        .then((data)=>{                         //👈if data returns reject we show alert and remove loading animation by adding back default styles                      
            if(data.type.endsWith("rejected")){
                alert("Ann error occurred while editing")
                const changeToLoader = document.getElementById(todo._uuid!)
                if(changeToLoader) changeToLoader.className = todo.isCompleted? Style["todo-complited"]:Style["todo-incomplited"]
            }
        })
    }
    const deleteTodoFunc = (todo:IgetTodo,) => {
        dispatch(deletedTodo(todo))
        .then((data)=>{                         //👈if data returns reject we show alert and remove loading animation by adding back default styles                      
            if(data.type.endsWith("rejected")){
                alert("Ann error occurred while deleting")
                const changeToLoader = document.getElementById(todo._uuid!)
                if(changeToLoader) changeToLoader.className = todo.isCompleted? Style["todo-complited"]:Style["todo-incomplited"]
            }
        })
        
    }

    return {todoFiltered, getloader, error, changeCompleteStatus, deleteTodoFunc}
}

export default useModifyTodo

//changeToLoader:HTMLElement