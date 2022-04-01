import React from "react";

import Nav from "../nav/Nav";

const LayoutDashComponent = (props) => {
    return (
        <>
            <Nav />
            <section style={{ backgroundColor: '#F0F8FF' }} className='position-absolute w-100 h-100'>
                {props.children}
            </section>
        </>

    )
}

export default LayoutDashComponent