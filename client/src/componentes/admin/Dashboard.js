import { Link } from "react-router-dom"




const Dashboard = ()=>{
    return (<>
    <div className="wrapper contenido">
        <div className="dashboard">
            <Link className="item browse-movies" to="/inicio"></Link>
            <Link className="item add-movie" to="/inicio"></Link>
            <Link className="item edit-movie" to="/inicio"></Link>
        </div>
    </div>
    </>)
}

export default Dashboard