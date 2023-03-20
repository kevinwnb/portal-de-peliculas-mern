import $ from "jquery"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Buscar = (props) => {

    const [searchString, setSearchString] = useState("")
    const [peliculas, setPeliculas] = useState([])
    const [info, setInfo] = useState("")

    useEffect(() => {
        setInfo("")
        buscarPeliculas(searchString)
    }, [searchString])

    useEffect(() => {
        if (info)
            setPeliculas([])
    }, [info])

    const buscarPeliculas = searchStringParam => {
        fetch("/api/peliculas/buscar", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
                "content-type": "application/json"
            },
            body: JSON.stringify({ searchString: searchStringParam })
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
                return (<div className="d-flex movie-box flex-wrap">
                    {peliculasParam.map((p) => (<div key={p._id}>
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

            case (peliculasParam && peliculasParam.length === 0 && infoParam.length !== 0):
                return (<div className="alert alert-info">{info}</div>)
                break;

            case (searchString.length !== 0):
                return (<div className="loading-icon"></div>)
                break;
            
            default:
                return null
                break;
        }
    }

    return (<>
        <div className="container contenido">
            <div className="d-flex justify-content-center w-100 mb-5">
                <input placeholder="Buscar" className="buscador" onChange={(e) => setSearchString(e.target.value)} type="text" />
            </div>
            {renderPeliculas(peliculas, info)}
        </div>
    </>)
}

export default Buscar