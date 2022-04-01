import React from "react";

const AreaGridAuth = props => {

    return (
        <div className="row pb-3 pt-3">

            <div className="col-md-6">
                {props.left}
            </div>

            <div className="col-md-6 p-5 cont-left">
                {props.right}
            </div>

        </div>
    )

}

export default AreaGridAuth