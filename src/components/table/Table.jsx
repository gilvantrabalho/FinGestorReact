import React from "react";

const Table = props => {

    return (
        <table className='table table-borderless table-hover table-striped'>
            <thead>
                <tr>
                    {
                        props.headers.map((item, index) => (
                            <th key={index} className={item.center ? 'text-center' : ''}>{item.value}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )

}

export default Table