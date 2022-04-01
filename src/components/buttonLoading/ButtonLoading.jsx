import React from "react";

const ButtonLoading = () => {

    return (
        <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Loading...</span>
        </button>
    )

}

export default ButtonLoading