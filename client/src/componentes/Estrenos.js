import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const Estrenos = props => {

    const [peliculas, setPeliculas] = useState([])
    const [info, setInfo] = useState("")

    useEffect(() => {
        getEstrenos()
    }, [])

    const getEstrenos = () => {
        fetch("/api/peliculas/estrenos", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return setInfo(data.error)

                setPeliculas(data)
            })
    }

    const renderPeliculas = (peliculasParam, infoParam) => {
        switch (true) {
            case (peliculasParam && peliculasParam.length > 0):
                return (<div className="movie-box d-flex flex-wrap">
                    {peliculasParam.map(p => (<div>
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
                </div>)
                break;

            case (infoParam !== ""):
                return (<div className="alert alert-info">{infoParam}</div>)
                break;

            default:
                return (<div className="loading-icon"></div>)
                break;
        }
    }

    return (<>
        <div className="wrapper contenido">
            <h6 className="titulo-apartado display-6 mt-5">Estrenos</h6>
            {renderPeliculas(peliculas, info)}
        </div>
    </>)
}

export default Estrenos