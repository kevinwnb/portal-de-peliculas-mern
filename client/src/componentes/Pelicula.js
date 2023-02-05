import { Link, useParams } from "react-router-dom"
import Image from "./imagenes/catalogo/bodas.png"

const Pelicula = (props) => {
    let params = useParams()

    let pelicula = {
        "Nombre": "Bodas",
        "Año": 1996,
        "Categoría": "Comedy",
        "Edad Recomendada": 16
    }

    return (<>
        <div className="pelicula container contenido">
            <h3 className="display-3 my-5">{pelicula["Nombre"]}</h3>
            <div className="row">
                <div className="justify-content-center justify-content-xl-start d-flex col-xl-4">
                    <img src={Image} />
                </div>
                <div className="order-3 order-xl-2 col-xl-6">
                    Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet
                    <div className="py-4">
                        <Link to="/pelicula/1/ver" className="boton-ver">VER HD</Link>
                        <Link to="/pelicula/1/ver" className="boton-comprar-4k">COMPRAR 4K</Link>
                    </div>
                </div>
                <div className="flex-column order-2 order-xl-3 col-xl-2">
                    {Object.entries(pelicula).map(([key, value]) => {
                        return (<><h6>{key}: </h6><p>{value}</p></>)
                    })}
                </div>
            </div>
        </div>
    </>)
}

export default Pelicula