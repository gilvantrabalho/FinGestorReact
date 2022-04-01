import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Home from "./pages/dash/home/Home";
import Extract from "./pages/dash/extract/Extract";

const PrivateRoute = ({ children }) => {
    let isAuthenticated

    localStorage.getItem('email') ?
        isAuthenticated = true
        :
        isAuthenticated = false

    return isAuthenticated ?
        children
        :
        <Navigate to='/' />
}

const AllRoutes = () => (

    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Rotas Privadas */}
            <Route
                path="/home"
                element={<PrivateRoute>
                    <Home />
                </PrivateRoute>}
            />

            <Route
                path="/extract"
                element={
                    <PrivateRoute>
                        <Extract />
                    </PrivateRoute>
                }
            />

        </Routes>
    </BrowserRouter>

)

export default AllRoutes