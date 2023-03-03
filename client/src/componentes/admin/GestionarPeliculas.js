import { useEffect, useState } from "react"




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
    const [date, setDate] = useState()
    const [genre, setGenre] = useState()
    const [subgenre, setSubgenre] = useState()
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

        let criteria = {
            ...(searchByString && searchString && { searchString: searchString }),
            ...(searchByInitial && letter && { initial: letter }),
            ...(searchByDate && date && { date: date }),
            ...(searchByGenre && genre && { genre: genre }),
            ...(searchBySubgenre && subgenre && { subgenre: subgenre })
        }

        console.log(criteria)

        if (searchString.length < 4)
            setValidateSearchString("Introduce al menos 4 caracteres")

    }

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