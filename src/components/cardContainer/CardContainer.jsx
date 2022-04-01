import React from "react";

const CardContainer = (props) => {

    return (
        <div className='bg-white shadow-sm p-5 mt-3 container rounded'>
            {props.children}
        </div>
    )

}

export default CardContainer