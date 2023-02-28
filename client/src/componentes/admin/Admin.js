import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import CrearPelicula from "./CrearPelicula"
import Dashboard from "./Dashboard"
import Login from "./Login"
import EditarPelicula from './EditarPelicula'

const Admin = (props) => {
    const [token, setToken] = useState(Cookies.get("admin-token") || "")
    const navigate = useNavigate()

    useEffect(() => {
        props.setNav(false)
        props.setFooter(false)
        console.log(Cookies.get("admin-token"))
    }, [])

    const logout = e => {
        Cookies.remove("admin-token")
        setToken("")
    }

    return (<>
        <nav className="admin-nav">
            <button onClick={e => logout()}>Salir</button>
        </nav>
        <Routes>
            <Route path="/login" element={(token ? <Navigate to="/admin/dashboard" replace={true} /> : <Login token={token} setToken={setToken} />)} />
            <Route path="/dashboard" element={(token ? <Dashboard /> : <Navigate to="/admin/login" replace={true} />)} />
            <Route path="/peliculas/crear" element={token ? <CrearPelicula /> : <Navigate to="/admin/login" replace={true} />} />
            <Route path="/peliculas/editar/:id" element={token ? <EditarPelicula /> : <Navigate to="/admin/login" replace={true} />} />
            <Route path="*" element={<Navigate to="/admin/login" replace={true} />} />
        </Routes>
    </>)
}

export default Admin