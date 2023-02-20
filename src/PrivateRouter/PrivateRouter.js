import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = { 'token': sessionStorage.getItem("token") }
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes
