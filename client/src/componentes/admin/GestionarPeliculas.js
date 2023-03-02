import { useEffect, useState } from "react"




const GestionarPeliculas = props => {

    const [peliculas, setPeliculas] = useState([])
    const [genresList, setGenresList] = useState([])
    const [searchString, setSearchString] = useState("")
    const [validateSearchString, setValidateSearchString] = useState("")
    const [searchByDate, setSearchByDate] = useState(false)
    const [searchByString, setSearchByString] = useState(false)
    const [searchByGenre, setSearchByGenre] = useState(false)
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
                    alert(1)
                    return
                }

                setGenresList(data)
            })

        fetch("/api/admin/pelicula", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return

                setPeliculas(data)
            })
    }, [])

    const searchPeliculas = e => {
        e.preventDefault()
        if (searchString.length < 4)
            setValidateSearchString("Introduce al menos 4 caracteres")
    }

    return (<>
        <div className="wrapper contenido gestionar-peliculas pb-100px">
            <h6 className="display-6 mb-5">Criterios de búsqueda</h6>
            <form className="d-flex" onSubmit={e => searchPeliculas(e)}>
                <div className="grupo mx-3">
                    <label htmlFor="idSearchByString">Incluir término
                        <input type="checkbox" id="idSearchByString" onChange={e => setSearchByString(e.target.checked)} checked={searchByString} />
                    </label>
                    <input disabled={!searchByString} type="text" id="idSearchString" minLength={4} placeholder="Criterio de búsqueda" />
                </div>
                <div className="grupo mx-3">
                    <select>
                        {[...abc].map((letter, index) => <option className="btn btn-link" value={letter} key={index}>{letter.toLocaleUpperCase()}</option>)}
                    </select>
                </div>
                <div className="grupo mx-3">
                    <label htmlFor="idSearchByDate">Fecha de estreno
                        <input id="idSearchByDate" type="checkbox" checked={searchByDate} onChange={e => setSearchByDate(e.target.checked)} />
                    </label>
                    <input disabled={!searchByDate} type="date" />
                </div>
                <div className="grupo mx-3">
                    <label htmlFor="idSearchByGenre">Género
                        <input id="idSearchByGenre" type="checkbox" checked={searchByGenre} onChange={e => setSearchByGenre(e.target.checked)} />
                    </label>
                    <select disabled={!searchByGenre}>
                        <option>Selecciona un género</option>
                        {genresList.map((g, index) => <option value={g._id} key={index}>{g.name}</option>)}
                    </select>
                </div>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Nombre</th>
                        <th>F. Estreno</th>
                        <th>Género</th>
                        <th>Subgénero</th>
                    </tr>
                </thead>
                <tbody>
                    {peliculas.map((p, index) => <tr key={index}>
                        <td><img src={"http://localhost:5000" + p.imgPath} /></td>
                        <td>{p.name}</td>
                        <td>{(new Date(p.date)).toLocaleDateString("es-ES", { day: "numeric", month: "numeric", year: "numeric" })}</td>
                        <td>{(genresList.find(g => g._id === p.genre).name)}</td>
                        <td>{p.subgenre && (genresList.find(g => g._id === p.subgenre).name) || "-"}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>)
}

export default GestionarPeliculas