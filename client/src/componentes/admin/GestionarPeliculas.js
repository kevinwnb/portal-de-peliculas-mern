import { memo, useEffect, useMemo, useState } from "react"
import Pulse from "../imagenes/pulse loading.svg"



const GestionarPeliculas = props => {

    const [peliculas, setPeliculas] = useState([])
    const [genresList, setGenresList] = useState([])
    const [searchString, setSearchString] = useState("")
    const [validateSearchString, setValidateSearchString] = useState("")
    const [searchByDate, setSearchByDate] = useState(false)
    const [searchByString, setSearchByString] = useState(false)
    const [searchByGenre, setSearchByGenre] = useState(false)
    const [searchByInitial, setSearchByInitial] = useState(false)
    const [searchBySubgenre, setSearchBySubgenre] = useState(false)
    const [letter, setLetter] = useState("a")
    const [date, setDate] = useState("")
    const [genre, setGenre] = useState("")
    const [subgenre, setSubgenre] = useState("")
    //const [skip, setSkip] = useState(0)
    // const [dataCache, setDataCache] = useState({
    //     searchString: "",
    //     letter: "",
    //     date: "",
    //     genre: "",
    //     subgenre: ""
    // })
    const [showMessage, setShowMessage] = useState("")
    const abc = "abcdefghijklmnñopqrstuvwxyz"

    useEffect(() => {
        fetch("/api/admin/genero", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    return
                }

                setGenresList(data)
            })

        searchPeliculas()
    }, [])

    const searchPeliculas = (e) => {
        if (e)
            e.preventDefault()

        let data = {
            ...(searchByString && searchString && { searchString: searchString }),
            ...(searchByInitial && letter && { initial: letter }),
            ...(searchByDate && date && { date: date }),
            ...(searchByGenre && genre && { genre: genre }),
            ...(searchBySubgenre && subgenre && { subgenre: subgenre }),
            skip: 0,
            limit: 50
        }

        //setDataCache(data)

        fetch("/api/admin/pelicula/buscar", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                switch (res.status) {
                    case 404:
                        setShowMessage("No se han encontrado peliculas con los filtros seleccionados")
                        break;

                    default:
                        setShowMessage("")
                        break;
                }

                return res.json()
            })
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setPeliculas([...data.peliculas])
                //setSkip(10)
            })
    }

    // const loadMore = () => {
    //     let data = { ...dataCache, skip: skip }

    //     fetch("/api/admin/pelicula/buscar", {
    //         method: "POST",
    //         headers: {
    //             Authorization: "Bearer " + props.token,
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.error)
    //                 console.log(data.error)

    //             setPeliculas([...peliculas, ...data.peliculas])

    //             //setSkip(s => s + 10)
    //         })
    // }

    const Table = useMemo(() => () => {
        if (showMessage)
            return (<p className="alert alert-warning">{showMessage}</p>)
        if (peliculas.length === 0 || genresList.length === 0)
            return (<div className="loading-icon"></div>)
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Portada</th>
                        <th>Nombre</th>
                        <th>F. Estreno</th>
                        <th>Género</th>
                        <th>Subgénero</th>
                    </tr>
                </thead>
                <tbody>
                    {peliculas.map((p, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={"http://localhost:5000" + p.imgPath} /></td>
                        <td>{p.name}</td>
                        <td>{(new Date(p.date)).toLocaleDateString("es-ES", { day: "numeric", month: "numeric", year: "numeric" })}</td>
                        <td>{(genresList.find(g => g._id === p.genre).name)}</td>
                        <td>{p.subgenre && (genresList.find(g => g._id === p.subgenre).name) || "-"}</td>
                    </tr>)}
                </tbody>
            </table>)
    }, [peliculas, genresList, showMessage])

    return (<>
        <div className="wrapper contenido gestionar-peliculas pb-100px">
            <h6 className="display-6 mb-5">Criterios de búsqueda</h6>
            <form onSubmit={e => searchPeliculas(e)}>
                <div className="d-flex mx-auto mb-5">
                    <div className="grupo mx-3">
                        <label htmlFor="idSearchByString">
                            <input type="checkbox" id="idSearchByString" onChange={e => setSearchByString(e.target.checked)} checked={searchByString} />
                            Incluir término
                        </label>
                        <input className="input" onChange={e => setSearchString(e.target.value)} value={searchString} disabled={!searchByString} type="text" id="idSearchString" minLength={4} placeholder="Criterio de búsqueda" />
                    </div>
                    <div className="grupo mx-3">
                        <label htmlFor="idSearchByInitial">
                            <input type="checkbox" id="idSearchByInitial" onChange={e => setSearchByInitial(e.target.checked)} checked={searchByInitial} />
                            Letra inicial
                        </label>
                        <select onChange={e => setLetter(e.target.value)} value={letter} className="input" disabled={!searchByInitial}>
                            {[...abc].map((letter, index) => <option className="btn btn-link" value={letter} key={index}>{letter.toLocaleUpperCase()}</option>)}
                        </select>
                    </div>
                    <div className="grupo mx-3">
                        <label htmlFor="idSearchByDate">
                            <input id="idSearchByDate" type="checkbox" checked={searchByDate} onChange={e => setSearchByDate(e.target.checked)} />
                            Fecha de estreno
                        </label>
                        <input className="input" disabled={!searchByDate} type="date" onChange={e => setDate(e.target.value)} value={date} />
                    </div>
                    <div className="grupo mx-3">
                        <label htmlFor="idSearchByGenre">
                            <input id="idSearchByGenre" type="checkbox" checked={searchByGenre} onChange={e => setSearchByGenre(e.target.checked)} />
                            Género
                        </label>
                        <select value={genre} onChange={e => setGenre(e.target.value)} className="input" disabled={!searchByGenre}>
                            <option value="">Selecciona un género</option>
                            {genresList.map((g, index) => <option value={g._id} key={index}>{g.name}</option>)}
                        </select>
                    </div>
                    <div className="grupo mx-3">
                        <label htmlFor="idSearchBySubgenre">
                            <input id="idSearchBySubgenre" type="checkbox" checked={searchBySubgenre} onChange={e => setSearchBySubgenre(e.target.checked)} />
                            Subgénero
                        </label>
                        <select value={subgenre} onChange={e => setSubgenre(e.target.value)} className="input" disabled={!searchBySubgenre}>
                            <option value="">Selecciona un género</option>
                            {genresList.map((g, index) => g._id != genre ? <option value={g._id} key={index}>{g.name}</option> : null)}
                        </select>
                    </div>
                    <div className="grupo mx-3">
                        <button className="" type="submit">BUSCAR</button>
                    </div>
                </div>
            </form>
            <p className="alert alert-info">La búsqueda retorna un máximo de 50 líneas, si la película que busca no se encuentra entre los resultados intente concretar su búsqueda</p>
            <div className="pre-table">
                <Table />
            </div>
            {/* <div className="mt-5">
                <button className="load-more" onClick={() => loadMore()}><i className="fa-solid fa-plus"></i></button>
            </div> */}
        </div>
    </>)
}

export default GestionarPeliculas