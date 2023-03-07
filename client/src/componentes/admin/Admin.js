import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom"
import CrearPelicula from "./CrearPelicula"
import Dashboard from "./Dashboard"
import Login from "./Login"
import EditarPelicula from './EditarPelicula'
import GestionarPeliculas from "./GestionarPeliculas"
import GestionarUsuarios from "./usuario/GestionarUsuarios"
import CrearUsuario from "./usuario/CrearUsuario"

const Admin = (props) => {
    const [token, setToken] = useState(Cookies.get("admin-token") || "")
    const navigate = useNavigate()

    useEffect(() => {
        props.setNav(false)
        props.setFooter(false)
    }, [])

    const logout = e => {
        Cookies.remove("admin-token")
        setToken("")
    }

    return (<>
        <div className="d-flex">
            <nav className="admin-nav">
                <NavLink activeclassname="active" to="/admin/dashboard">Dashboard</NavLink>
                <NavLink activeclassname="active" to="/admin/peliculas/gestionar">Gestionar películas</NavLink>
                <NavLink activeclassname="active" to="/admin/peliculas/crear">Añadir Película</NavLink>
                <NavLink activeclassname="active" to="/admin/usuarios/gestionar">Gestionar Usuarios</NavLink>
                <NavLink activeclassname="active" to="/admin/usuarios/crear">Añadir Administrador</NavLink>
                <button onClick={e => logout()}>Salir</button>
            </nav>
            <div style={{ paddingLeft:"200px", flex:1, maxWidth:"100%" }}>
                <Routes>
                    <Route path="/login" element={(token ? <Navigate to="/admin/dashboard" replace={true} /> : <Login token={token} setToken={setToken} />)} />
                    <Route path="/dashboard" element={(token ? <Dashboard /> : <Navigate to="/admin/login" replace={true} />)} />
                    <Route path="/peliculas/gestionar" element={(token ? <GestionarPeliculas token={token} /> : <Navigate to="/admin/login" replace={true} />)} />
                    <Route path="/peliculas/crear" element={token ? <CrearPelicula token={token} /> : <Navigate to="/admin/login" replace={true} />} />
                    <Route path="/peliculas/editar/:id" element={token ? <EditarPelicula token={token} /> : <Navigate to="/admin/login" replace={true} />} />
                    <Route path="/usuarios/gestionar" element={(token ? <GestionarUsuarios token={token} /> : <Navigate to="/admin/login" replace={true} />)} />
                    <Route path="/usuarios/crear" element={token ? <CrearUsuario token={token} /> : <Navigate to="/admin/login" replace={true} />} />
                    {/* <Route path="/usuarios/editar/:id" element={token ? <EditarUsuario token={token} /> : <Navigate to="/admin/login" replace={true} />} /> */}
                    <Route path="*" element={<Navigate to="/admin/login" replace={true} />} />
                </Routes>
            </div>
        </div>
    </>)
}

export default Admin