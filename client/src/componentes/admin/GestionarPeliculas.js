import { useEffect, useState } from "react"




const GestionarPeliculas = props => {

    const [peliculas, setPeliculas] = useState([])

    const genres = props.genres

    useEffect(() => {
        fetch("/api/admin/genre", {
            method: "GET"
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

                setPeliculas(data.peliculas)
            })
    }, [])

    return (<>
        <div className="wrapper contenido pb-100px">
            <table>
                <tr>
                    <th>Portada</th>
                    <th>Nombre</th>
                    <th>F. Estreno</th>
                    <th>Género</th>
                    <th>Subgénero</th>
                </tr>
                {peliculas.map(p => <tr>
                    <td>{p.image}</td>
                    <td>{p.name}</td>
                    <td>{p.date}</td>
                    <td>{p.genre}</td>
                    <td>{p.subgenre}</td>
                </tr>)}
            </table>
        </div>
    </>)
}

export default GestionarPeliculas