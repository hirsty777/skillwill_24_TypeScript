import useModifyTodo from "../hooks/useModifyTodo"
import Style from "../styles/components/TodoList.module.css"
import NotCheckedeSvg from "../assets/notchecked.svg"
import CheckedeSvg from "../assets/checked.svg"
import { useSelector } from "react-redux"
import { colorModeSelector, lightModeSelector, darkModeSelector } from "../store/todo/todo.slice"
import React from "react"
import { IgetTodo} from "../interfaces/todoInterface"

interface ITodoList{
    complited:boolean
}
const TodoList:React.FC<ITodoList> = ({complited}):JSX.Element  => {
    const {todoFiltered, changeCompleteStatus, deleteTodoFunc} = useModifyTodo(complited) //if we want copleted Todos we pass true else false
    const colorMode =  useSelector(colorModeSelector)
    const lightMode =  useSelector(lightModeSelector)
    const darkMode =  useSelector(darkModeSelector)


    const onChangeFunc = (todo:IgetTodo) => {
        changeCompleteStatus(todo) 
        //experimentin
        const changeToLoader = document.getElementById(todo._uuid!)
        if(changeToLoader) changeToLoader.className = Style.loader
    }
    const ondeleteTodoFunc = (todo:IgetTodo) => {
        deleteTodoFunc(todo) //👈 we manage reject case inside this func
        //experimentin
        const changeToLoader = document.getElementById(todo._uuid!)
        if(changeToLoader) changeToLoader.className = Style.loader 
    }


    return (
        <div className={Style.wrapper} style={colorMode? lightMode.textColor : darkMode.textColor}>
            <h1> {complited ? "Finished Todos" : "Unfinished Todos"} </h1>
            <div className={Style["todo-wrapper"]}>
            
            {todoFiltered.map((todo) => (
                <div key={todo._uuid} className={complited ? Style["todo-complited"]:Style["todo-incomplited"]} id={todo._uuid}>
                    <div className={Style["todo-user"]}>User: {todo.firstName}</div>
                    <div className={Style["todo-date"]}>Due Date: {todo.dueDate}</div>
                    <div className={Style["todo-task"]}>Task: {todo.name}</div>
                    <div className={Style["todo-ckeck-wrapper"]}>
                        <img className={Style["todo-svg-ckeck"]} src={complited ? CheckedeSvg : NotCheckedeSvg} alt="checkbox" />
                        <input className={Style["todo-check"]} type="checkbox" defaultChecked={todo.isCompleted} onChange={() => onChangeFunc(todo)} />
                    </div>
                    <button className={Style["todo-delete"]} onClick={()=>ondeleteTodoFunc(todo)}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    )
            
   
}

export default TodoList