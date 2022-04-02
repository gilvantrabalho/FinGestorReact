import React from "react";

const Button = (props) => {

    return (
        <div className="d-grid gap-2 mt-3">
            <button onClick={props.onClick} className={props.class} type={props.type}>
                {props.text}
            </button>
        </div>

    )

}

export default Button