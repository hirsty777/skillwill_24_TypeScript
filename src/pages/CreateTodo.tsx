import React, { useRef, useState } from "react"
import Style from "../styles/pages/CreateTodo.module.css"
import ConfirmSvg from "../assets/confirm.svg"
import modeLightSvg from "../assets/modeLight.svg"
import modeDarkSvg from "../assets/modeDark.svg"
import {Link} from "react-router-dom"
import { useSelector } from "react-redux"
import { postTodo } from "../store/todo/todo.thunks"
import { changeMode, colorModeSelector, darkModeSelector, errorSelector, lightModeSelector } from "../store/todo/todo.slice"
import { useAppDispatch } from "../store"
import ErrorComponent from "../components/ErrorComponent"


const CreateTodo = () => {
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const taskRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLInputElement>(null)
    const dueDateRef = useRef<HTMLInputElement>(null)
    const colorMode =  useSelector(colorModeSelector)
    const lightMode =  useSelector(lightModeSelector)
    const darkMode =  useSelector(darkModeSelector)
    const errorState = useSelector(errorSelector)
    const dispatch = useAppDispatch()

    const onSubmit = (event:React.FormEvent):void => {
        event.preventDefault();
        //force to fill all input fields before adding (it also removes typescript error that current value might be null) ✔
        if(!taskRef.current?.value.trim()||!userRef.current?.value.trim()
        ||!dueDateRef.current?.value.trim()) return

        //improved confirm animation. naw it waits for post data to be fulfilled and olny then show animation 👏
        dispatch(postTodo([{
            name:taskRef.current.value,
            firstName:userRef.current.value,
            dueDate:dueDateRef.current.value,
            isCompleted:false
        }])).then((check) => {if(check.type === "todo/post/fulfilled")
            setShowConfirm(true)
            setTimeout(()=>{
                setShowConfirm(false)
            },1000)
        })
        //clear
        taskRef.current.value = ""
        userRef.current.value = ""
        dueDateRef.current.value = ""
        
    }

    if(errorState)return <ErrorComponent/>
    return (
        <div className={Style.wrapper} style={colorMode? lightMode.background : darkMode.background}>
            <button onClick={()=>dispatch(changeMode())} className={Style["mode-btn"]}>
                <img src={colorMode? modeLightSvg : modeDarkSvg} alt="modeLightSvg" />
            </button>

            <form onSubmit={onSubmit} className={Style["todo-form"]}>
                <h1>Add Todo</h1>
                <input type="text"  ref={taskRef} placeholder="ToDo"/>
                <input type="text" ref={userRef} placeholder="User"/>
                <div className={Style["date-wrapper"]}>
                    <label htmlFor="due-date">Due Date</label>
                    <input type="date" id="due-date" ref={dueDateRef} placeholder="Due Date"/>
                </div>
                <div className={Style["btn-wrapper"]}>
                    <Link className={Style["see-todo-btn"]} to={"todolist"}>See List</Link>
                    <button className={Style["add-todo-btn"]}>Submit</button>
                    {showConfirm && <img src={ConfirmSvg}  className={Style.confirm} alt="confirm" />}
                </div>
            </form>
        </div>
    )
}

export default CreateTodo

