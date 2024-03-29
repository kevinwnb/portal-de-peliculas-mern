import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatISO } from "date-fns"



const CrearPelicula = (props) => {

    const params = useParams()
    const [id, setId] = useState(params.id || "")
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [genre, setGenre] = useState("")
    const [image, setImage] = useState("")
    const [rawImage, setRawImage] = useState("")
    const [subgenre, setSubgenre] = useState("")
    const [updatedAt, setUpdatedAt] = useState("")
    const [nameValidation, setNameValidation] = useState("")
    const [genreValidation, setGenreValidation] = useState("")
    const [dateValidation, setDateValidation] = useState("")
    const [imageValidation, setImageValidation] = useState("")
    const [subgenreValidation, setSubgenreValidation] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [genresList, setGenresList] = useState([])

    useEffect(() => {
        getGenres()
        getPelicula(params.id)
    }, [])

    const getGenres = () => {
        fetch("/api/admin/genero", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setGenresList(data)
            })
    }

    const setImagePreview = e => {
        setRawImage(e.target.files[0])
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener("load", () => {
            setImage(reader.result)
        })
    }

    const getPelicula = (id) => {
        fetch("/api/admin/pelicula/" + id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setName(data.name)
                setDate(data.date)
                setGenre(data.genre)
                setSubgenre(data.subgenre)
                setImage(data.imgPath)
                setUpdatedAt(data.updatedAt)
                console.log(data)
            })
    }

    const updatePelicula = e => {
        e.preventDefault()

        let errors = 0
        if (!name) {
            setNameValidation("Nombre es requerido")
            errors++
        }
        else
            setNameValidation("")

        if (!genre) {
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
            formData.append("_id", id)
            formData.append("name", name)
            formData.append("date", date)
            formData.append("genre", genre)
            formData.append("subgenre", subgenre)
            formData.append("updatedAt", updatedAt)
            if (rawImage)
                formData.append("newImage", rawImage)
            else
                formData.append("imgPath", image)
            fetch("/api/admin/pelicula", {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + props.token
                },
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setErrorMessage(data.error)
                        return
                    }

                    setSuccessMessage("Película actualizada con éxito")
                })
        }
    }

    return (<>
        <div className="contenido wrapper editar-pelicula">
            <h6 className="display-6 text-center mb-5">Editar película</h6>
            {name && date && genre && subgenre && genresList ? (<form onSubmit={updatePelicula}>
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                <div className="grupo">
                    <label htmlFor="name">Nombre de la película</label>
                    <input className="input" type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                    {nameValidation && <small className="text-danger">{nameValidation}</small>}
                </div>
                <div className="grupo">
                    <label htmlFor="genre">Género</label>
                    <select className="input" type="text" id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
                        <option value="">Selecciona un género</option>
                        {(genresList.map((g, index) => <option key={index} value={g._id}>{g.name}</option>))}
                    </select>
                    {genreValidation && <small className="text-danger">{genreValidation}</small>}
                </div>
                <div className="grupo">
                    <label htmlFor="subgenre">Subgénero</label>
                    <select className="input" type="text" id="subgenre" value={subgenre} onChange={e => setSubgenre(e.target.value)}>
                        <option value="">Selecciona un subgénero (opcional)</option>
                        {(genresList.map((g, index) => g._id != genre ? <option key={index} value={g._id}>{g.name}</option> : null))}
                    </select>
                    {subgenreValidation && <small className="text-danger">{subgenreValidation}</small>}
                </div>
                <div className="grupo">
                    <label htmlFor="date">Fecha de estreno</label>
                    <input className="input" type="date" id="date" value={formatISO((new Date(date)), { representation: "date" })} onChange={e => setDate(e.target.value)} />
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
                <button type="submit">GUARDAR CAMBIOS</button>
            </form>) : (<div className="loading-icon"></div>)}
        </div>
    </>)
}

export default CrearPelicula