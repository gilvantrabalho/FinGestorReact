import React from "react";
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";
import logoImg from '../../assets/img/logo.png'

const Nav = () => {

    let navigate = useNavigate()

    const loggout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <nav className="bg-white p-2 shadow-sm">
            <div className="container d-flex justify-content-between">
                {/* <h3>Gestor Gastos</h3> */}
                <div className="d-flex align-items-center">
                    <Link to="/home">
                        <img height="50px" src={logoImg} alt="" />
                    </Link>
                    <div className="ms-5 ps-3 pe-3 border-start">
                        <Link to="/home">Home</Link>
                    </div>
                    <div className="ps-3 pe-3 border-start border-end">
                        <Link to="/extract">Extratos</Link>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="border-end pe-3"><strong>Olá</strong>, {localStorage.getItem('name')}</div>
                    <button className="btn fw-bold" onClick={loggout} type='button'>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    )

}

export default Nav