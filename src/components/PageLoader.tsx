import React from "react"
import { useSelector } from "react-redux"
import { colorModeSelector, lightModeSelector, darkModeSelector } from "../store/todo/todo.slice"
import Style from "../styles/components/PageLoader.module.css"

const PageLoader = ():JSX.Element  => {
    const colorMode =  useSelector(colorModeSelector)
    const lightMode =  useSelector(lightModeSelector)
    const darkMode =  useSelector(darkModeSelector)

  
    return (
        <div className={Style["loading-wrapper"]} style={colorMode? lightMode.background : darkMode.background}>
            <div className={Style.loading}></div>
        </div>
    )
}

export default PageLoader