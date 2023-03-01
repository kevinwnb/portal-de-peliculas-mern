import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom"
import CrearPelicula from "./CrearPelicula"
import Dashboard from "./Dashboard"
import Login from "./Login"
import EditarPelicula from './EditarPelicula'
import GestionarPeliculas from "./GestionarPeliculas"

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
            <NavLink activeClassname="active" to="/admin/dashboard">Dashboard</NavLink>
            <NavLink activeClassname="active" to="/admin/peliculas/gestionar">Gestionar películas</NavLink>
            <NavLink activeClassname="active" to="/admin/peliculas/crear">Añadir Película</NavLink>
            <NavLink activeClassname="active" to="/admin/peliculas/editar">Modificar Película</NavLink>
            <button onClick={e => logout()}>Salir</button>
        </nav>
        <Routes>
            <Route path="/login" element={(token ? <Navigate to="/admin/dashboard" replace={true} /> : <Login token={token} setToken={setToken} />)} />
            <Route path="/dashboard" element={(token ? <Dashboard /> : <Navigate to="/admin/login" replace={true} />)} />
            <Route path="/peliculas/gestionar" element={(token ? <GestionarPeliculas genres={props.genres} /> : <Navigate to="/admin/login" replace={true} />)} />
            <Route path="/peliculas/crear" element={token ? <CrearPelicula token={token} /> : <Navigate to="/admin/login" replace={true} />} />
            <Route path="/peliculas/editar" element={token ? <EditarPelicula /> : <Navigate to="/admin/login" replace={true} />} />
            <Route path="*" element={<Navigate to="/admin/login" replace={true} />} />
        </Routes>
    </>)
}

export default Admin