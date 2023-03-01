import { useEffect, useState } from "react"




const GestionarPeliculas = props => {

    const [peliculas, setPeliculas] = useState([])
    const [genresList, setGenresList] = useState([])

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

    return (<>
        <div className="wrapper contenido gestionar-peliculas pb-100px">
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
                        <td>{p.date}</td>
                        <td>{(genresList.find(g => g._id === p.genre).name)}</td>
                        <td>{(genresList.find(g => g._id === p.subgenre).name)}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>)
}

export default GestionarPeliculas