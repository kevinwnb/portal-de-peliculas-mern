import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Inicio(props) {

    const [peliculas, setPeliculas] = useState([])

    useEffect(() => {
        getPeliculas()
    }, [])

    const getPeliculas = (e) => {
        if (e)
            e.preventDefault()

        let data = {
            limit: 80
        }

        fetch("/api/peliculas?limit=" + data.limit, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => {
                switch (res.status) {
                    case 404:
                        console.log("No se han encontrado peliculas con los filtros seleccionados")
                        break;

                    default:
                        console.log("get peliculas good")
                        break;
                }

                return res.json()
            })
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setPeliculas([...data])
            })
    }

    const renderPeliculas = peliculas => {
        switch (true) {
            case (peliculas && peliculas.length > 0):
                return (<>
                    <h6 className="titulo-apartado text-center text-md-start display-6">Favoritas</h6>
                    <div className="movie-box d-flex flex-wrap">
                        {peliculas.slice(0, 8).map(p => (<div>
                            <div>
                                <Link to={"/pelicula/" + p._id}>
                                    <div>
                                        <h5 className="stars"><i className="text-warning fa-solid fa-star"></i>{p.likeAverage}</h5>
                                        <img src={p.imgPath} />
                                        <h5>{p.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>))}
                    </div>
                    <h6 className="titulo-apartado display-6 mt-5">Recomendaciones</h6>
                    <div className="movie-box d-flex flex-wrap">
                        {peliculas.slice(8, 16).map(p => (<div>
                            <div>
                                <Link to={"/pelicula/" + p._id}>
                                    <div>
                                        <h5 className="stars"><i className="text-warning fa-solid fa-star"></i>{p.likeAverage}</h5>
                                        <img src={p.imgPath} />
                                        <h5>{p.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>))}
                    </div>
                    <h6 className="titulo-apartado display-6 mt-5">Populares</h6>
                    <div className="movie-box d-flex flex-wrap">
                        {peliculas.slice(16, 24).map(p => (<div>
                            <div>
                                <Link to={"/pelicula/" + p._id}>
                                    <div>
                                        <h5 className="stars"><i className="text-warning fa-solid fa-star"></i>{p.likeAverage}</h5>
                                        <img src={p.imgPath} />
                                        <h5>{p.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>))}
                    </div>
                    <h6 className="titulo-apartado display-6 mt-5">Más Películas</h6>
                    <div className="movie-box d-flex flex-wrap">
                        {peliculas.slice(24, 32).map(p => (<div>
                            <div>
                                <Link to={"/pelicula/" + p._id}>
                                    <div>
                                        <h5 className="stars"><i className="text-warning fa-solid fa-star"></i>{p.likeAverage}</h5>
                                        <img src={p.imgPath} />
                                        <h5>{p.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>))}
                    </div>
                </>)
                break;

            default:
                return (<div className="loading-icon"></div>)
                break;
        }
    }

    return (<>
        <div className='contenido'>
            <div className="wrapper">
                {renderPeliculas(peliculas)}
            </div>
        </div>
    </>)
}

export default Inicio