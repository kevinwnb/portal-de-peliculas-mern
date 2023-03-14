import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Categorias = (props) => {

    const [peliculas, setPeliculas] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getPerGenre20()
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

    const getPerGenre20 = () => {
        fetch("/api/peliculas/pergenre20", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setPeliculas(data)
                console.log(Object.entries(data))
            })
    }

    const renderPeliculas = (genresParam, peliculasParam) => {
        switch (true) {
            case (peliculasParam.length > 0 && genresParam.length > 0):
                return (<>
                    {genresParam.sort((a, b) => a.name.localeCompare(b.name)).map((g, index) => (<div key={index}>
                        <h6 className="titulo-apartado display-6 mb-5">{g.name}</h6>
                        <div className="movie-box d-flex flex-wrap">
                            {peliculasParam.filter(p => p.genre === g._id).map((p, index) => (<div key={index}>
                                <div>
                                    <Link to={"/pelicula/" + p._id}>
                                        <div>
                                            <h5 className="stars">{p.likeAverage}</h5>
                                            <img src={p.imgPath} />
                                            <h5>{p.name}</h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>))}
                        </div>
                    </div>))}
                </>)
                break;

            default:
                return (<div className="loading-icon"></div>)
                break;
        }
    }

    return (<>
        <div className="wrapper contenido">
            {renderPeliculas(genres, peliculas)}
        </div>
    </>)
}

export default Categorias