import React from "react";

const AreaGrid = props => {

    return (
        <div className="row">

            <div className="col-md-4 pe-4">
                {props.left}
            </div>

            <div className="col-md-8 border-start">
                {props.right}
            </div>

        </div>
    )

}

export default AreaGrid