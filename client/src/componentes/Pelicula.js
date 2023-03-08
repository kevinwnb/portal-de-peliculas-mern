import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { format } from "date-fns"

const Pelicula = (props) => {
    const [pelicula, setPelicula] = useState({})
    const [genres, setGenres] = useState([])
    let params = useParams()

    useEffect(() => {
        getPelicula(params.id)
        getGenres()
    }, [])

    const getGenres = () => {
        fetch("/api/genero", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setGenres(data)
            })
    }

    const getPelicula = id => {
        fetch("/api/peliculas/" + params.id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setPelicula(data)
            })
    }

    const renderPelicula = (peliculaParam, genresParam) => {
        switch (true) {
            case Object.entries(peliculaParam).length !== 0 && genresParam.length !== 0:
                return (<>
                    <h3 className="display-3 my-5">{peliculaParam.name}</h3>
                    <div className="row">
                        <div className="justify-content-center justify-content-xl-start d-flex col-xl-4">
                            <img src={peliculaParam.imgPath} />
                        </div>
                        <div className="order-3 order-xl-2 col-xl-6">
                            {peliculaParam.description}
                            <div className="py-4">
                                <Link to="/pelicula/1/ver" className="boton-ver">VER HD</Link>
                                <Link to="/pelicula/1/ver" className="boton-comprar-4k">COMPRAR 4K</Link>
                            </div>
                        </div>
                        <div className="flex-column order-2 order-xl-3 col-xl-2">
                            <h6>Géneros</h6>
                            <p>{genres.find(g => g._id === peliculaParam.genre).name} y {genres.find(g => g._id === peliculaParam.subgenre).name}</p>
                            <h6>Fecha de estreno</h6>
                            <p>{format((new Date(peliculaParam.date)), "dd/MM/yyyy")}</p>
                        </div>
                    </div>
                </>)
                break;
            default:
                return (<div className="loading-icon"></div>)
                break;
        }
    }

    return (<>
        <div className="pelicula wrapper contenido">
            {renderPelicula(pelicula, genres)}
        </div>
    </>)
}

export default Pelicula