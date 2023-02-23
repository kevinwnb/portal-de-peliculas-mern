import { Link } from "react-router-dom"




const Dashboard = ()=>{
    return (<>
    <div className="wrapper contenido">
        <div className="dashboard">
            <Link className="item browse-movies" to="/inicio">Gestionar Peliculas</Link>
            <Link className="item add-movie" to="/admin/peliculas/crear">Añadir Película</Link>
            <Link className="item edit-movie" to="/inicio">Editar Película</Link>
        </div>
    </div>
    </>)
}

export default Dashboard