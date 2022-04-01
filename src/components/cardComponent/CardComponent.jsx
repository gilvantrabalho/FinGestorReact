import React from "react";

const CardComponent = (props) => {

    return (
        <div className='shadow-sm bg-white rounded p-4 mt-3 d-flex'>
            <i style={{ fontSize: '42px' }} className={`bi ${props.icon} me-3 ${props.type == 'E' ? 'text-success' : 'text-danger'}`}></i>
            <div>
                <div className='text-secondary'>{props.title}</div>
                <h3 className={`${props.type == 'E' ? 'text-success' : 'text-danger'}`}>{props.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>
            </div>

        </div>
    )

}

export default CardComponent