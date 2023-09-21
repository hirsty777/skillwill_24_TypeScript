import { RouteObject } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import CreateTodo from "../pages/CreateTodo";
import ShowTodo from "../pages/ShowTodo";

const router: RouteObject[] = [
    {
        element:<CreateTodo/>,
        path:"/"
    },
    {
        element:<ShowTodo/>,
        path:"/todolist"
    },
    {
        element:<ErrorComponent/>,
        path:"*"
    }
]

export default router