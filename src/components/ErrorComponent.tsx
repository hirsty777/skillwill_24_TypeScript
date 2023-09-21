import React from "react"
import Style from "../styles/components/Error.module.css"

const ErrorComponent = ():JSX.Element => {
  
    return (
        <div className={Style["error-wrapper"]}>
            <div className={Style.error}></div>
            {/* a tag because if its eeror then we should reload page*/}
            <a href="/" className={Style.link}>Go To Main Page</a>
        </div>
    )
}

export default ErrorComponent