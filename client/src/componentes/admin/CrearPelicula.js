import { useEffect, useState } from "react"


const CrearPelicula = props => {

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [genre, setGenre] = useState(0)
    const [image, setImage] = useState("")
    const [subgenre, setSubgenre] = useState(0)
    const [nameValidation, setNameValidation] = useState("")
    const [genreValidation, setGenreValidation] = useState("")
    const [dateValidation, setDateValidation] = useState("")
    const [imageValidation, setImageValidation] = useState("")
    const [subgenreValidation, setSubgenreValidation] = useState("")

    useEffect(() => {
        //alert(document.querySelector("#date").value)
    }, [])

    useEffect(() => {
        if (genre === subgenre) {
            setSubgenre(0)
        }
    }, [genre])

    let genres = "acción;aventuras;comedia;drama;documental;familiar;fantasía;terror;romance;ciencia ficción;suspense;anime;guerra;deportes;crimen"

    genres = genres.split(";")

    genres.sort((a, b) => a.localeCompare(b))

    let subgenres = genres

    subgenres = ["Seleccionar subgénero", ...subgenres]

    genres = ["Seleccionar género", ...genres]

    const setImagePreview = e => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener("load", () => {
            setImage(reader.result)
        })
    }

    const crearPelicula = e => {
        e.preventDefault()
        let errors = 0
        if (!name) {
            setNameValidation("Nombre es requerido")
            errors++
        }
        else
            setNameValidation("")

        if (Number(genre) === 0) {
            setGenreValidation("Selecciona un género")
            errors++
        }
        else
            setGenreValidation("")

        if (!date) {
            setDateValidation("Introduce la fecha de estreno")
            errors++
        }
        else
            setDateValidation("")

        if (!image) {
            setImageValidation("Selecciona una imágen para mostrar")
            errors++
        }
        else
            setImageValidation("")

        if (errors === 0) {
            let formData = new FormData()
            formData.append("name", name)
            formData.append("date", date)
            formData.append("genre", genre)
            formData.append("subgenre", subgenre)
            formData.append("image", image)
            fetch("/api/admin/peliculas", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + props.token,
                    "content-type": "multipart/form-data"
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="crear-pelicula wrapper contenido pb-100px">
                <form onSubmit={crearPelicula}>
                    <div className="grupo">
                        <label htmlFor="name">Nombre de la película</label>
                        <input className="input" type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                        {nameValidation && <small className="text-danger">{nameValidation}</small>}
                    </div>
                    <div className="grupo">
                        <label htmlFor="genre">Género</label>
                        <select className="input" type="text" id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
                            {(genres.map((value, index) => <option key={index} value={index}>{capitalizeFirstLetter(value)}</option>))}
                        </select>
                        {genreValidation && <small className="text-danger">{genreValidation}</small>}
                    </div>
                    <div className="grupo">
                        <label htmlFor="subgenre">Subgénero</label>
                        <select className="input" type="text" id="subgenre" value={subgenre} onChange={e => setSubgenre(e.target.value)}>
                            {(subgenres.map((value, index) => index == 0 || index != genre ? <option key={index} value={index}>{capitalizeFirstLetter(value)}</option> : null))}
                        </select>
                        {subgenreValidation && <small className="text-danger">{subgenreValidation}</small>}
                    </div>
                    <div className="grupo">
                        <label htmlFor="date">Fecha de estreno</label>
                        <input className="input" type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
                        {dateValidation && <small className="text-danger">{dateValidation}</small>}
                    </div>
                    <div className="grupo">
                        {image && <div className="d-flex flex-column align-items-center">
                            <div className="image-preview">
                                <img src={image} />
                            </div>
                            <button type="button" onClick={() => setImage("")} className="eliminar">Eliminar</button>
                        </div>}
                        {!image && <input className="mx-auto" type="file" id="image" onChange={e => setImagePreview(e)} />}
                        {imageValidation && !image ? <small className="text-danger">{imageValidation}</small> : null}
                    </div>
                    <button type="submit">AÑADIR</button>
                </form>
            </div>
        </>
    )
}

export default CrearPelicula