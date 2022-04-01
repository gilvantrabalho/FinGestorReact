import React from "react";

const ContAuth = props => {

    return (
        <div className="cont-auth">
            <div className="cont bg-white shadow-sm rounded">
                {props.children}
            </div>
        </div>
    )

}

export default ContAuth