import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Universal from "./videos/universal.mp4"


const Ver = (props) => {
    let params = useParams()
    const [pelicula, setPelicula] = useState({})

    let peli = {
        "Nombre": "Bodas",
        "Año": 1996,
        "Categoría": "Comedy",
        "Edad Recomendada": 16
    }

    useEffect(() => {
        setPelicula({ ...peli })
    }, [])

    return (<div className="container contenido">
        <h5 className="display-5">{pelicula["Nombre"]}</h5>
        <video width="100%" height="75%" controls="controls" autoplay="autoplay">
            <source src={Universal} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>)
}

export default Ver