import ConfirmSvg from "../assets/confirm.svg"
import modeLightSvg from "../assets/modeLight.svg"
import modeDarkSvg from "../assets/modeDark.svg"
import React, { useRef, useState } from "react"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Style from "../styles/pages/CreateTodo.module.css"
import { postTodo } from "../store/todo/todo.thunks"
import { changeMode, todoSelector } from "../store/todo/todo.slice"


const CreateTodo:React.FC = ():JSX.Element => {
    const taskRef = useRef<any>(null)
    const userRef = useRef<any>(null)
    const dueDateRef = useRef<any>(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const {colorMode, lightMode, darkMode} = useSelector(todoSelector)
    const dispatch = useDispatch()

    

    const onSubmit = (e:any) => {
        e.preventDefault();
        if(!taskRef.current?.value.trim()) return

        dispatch<any>(postTodo([{
            name:taskRef.current.value,
            firstName:userRef.current.value,
            dueDate:dueDateRef.current.value,
            isCompleted:false
        }])) 
        setShowConfirm(true)
        setTimeout(()=>{
            setShowConfirm(false)
        },1000)
        //clear
        taskRef.current.value = ""
        userRef.current.value = ""
        dueDateRef.current.value = ""
    }
    

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