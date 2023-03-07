import { Link } from "react-router-dom"




const Dashboard = ()=>{
    return (<>
    <div className="wrapper contenido">
        <h6 className="display-6 text-center mb-5">Dashboard</h6>
        <div className="dashboard">
            <Link className="item browse-movies" to="/admin/peliculas/gestionar">Gestionar Peliculas</Link>
            <Link className="item add-movie" to="/admin/peliculas/crear">Añadir Película</Link>
            <Link className="item browse-users" to="/admin/usuarios/gestionar">Gestionar Usuarios</Link>
            <Link className="item add-user" to="/admin/usuarios/crear">Añadir Usuario Administrador</Link>
        </div>
    </div>
    </>)
}

export default Dashboard