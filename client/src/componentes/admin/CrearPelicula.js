import { useState } from "react"


const CrearPelicula = () => {

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [genre, setGenre] = useState(0)

    const genres = "acción;aventuras;comedia;drama;documental;familiar;fantasía;terror;romance;ciencia ficción;suspense;anime;guerra;deportes;crimen"

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="crear-pelicula wrapper contenido">
                <form>
                    <label htmlFor="name">Nombre de la película</label>
                    <input className="input" type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                    <label htmlFor="genre">Género</label>
                    <select className="input" type="text" id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
                        {(genres.split(";").map((value, index) => <option value={index}>{capitalizeFirstLetter(value)}</option>))}
                    </select>
                    <label htmlFor="date">Fecha de estreno</label>
                    <input className="input" type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
                </form>
            </div>
        </>
    )
}

export default CrearPelicula