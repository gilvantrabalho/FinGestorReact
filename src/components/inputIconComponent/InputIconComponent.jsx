import React from "react";

const InputIconComponent = props => {

    return (
        <>
            <div className="form-group mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                        {props.icon}
                    </span>
                    {props.input}
                </div>
                <small className="text-danger">{props.message}</small>
            </div>

        </>
    )

}

export default InputIconComponent