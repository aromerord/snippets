import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component }) => {

    const login = useSelector(state => state.auth.login);

    return (login ?
        <Component> </Component>
        :
        <Navigate to="/" />
    )
}
