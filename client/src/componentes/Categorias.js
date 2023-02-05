import { Link } from "react-router-dom"


const Categorias = (props) => {
    
    const categorias = [
        { nombre: "Acción", id: 1 },
        { nombre: "Aventuras", id: 1 },
        { nombre: "Terror", id: 1 },
        { nombre: "Ciencia Ficción", id: 1 },
        { nombre: "Comedia", id: 1 },
        { nombre: "Thriller", id: 1 },
        { nombre: "Ánime", id: 1 },
        { nombre: "Romántica", id: 1 },
    ]

    return (<>
        <div className="container contenido">
            <div className="row">
                {categorias.map(c => (<div className="col col-lg-6 d-flex justify-content-center mb-2"><Link to="/" className="btn btn-dark">{c.nombre}</Link></div>))}
            </div>
        </div>
    </>)
}

export default Categorias