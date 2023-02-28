import { useState } from "react"
import { useParams } from "react-router-dom"




const CrearPelicula = () => {

    const params = useParams()
    const [name, setName] = useState(params.id || "")
    const [year, setYear] = useState("")
    const [validateName, setValidateName] = useState("")
    const [validateYear, setValidateYear] = useState("")

    return (<>
        <div className="contenido wrapper editar-pelicula">
            <form>
                <div className="grupo">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} />
                    {validateName && <small className="text-danger">{validateName}</small>}
                </div>
                <div className="grupo">
                    <label htmlFor="year">Fecha de estreno</label>
                    <input type="text" className="input" value={year} onChange={e => setName(e.target.value)} />
                    {validateYear && <small className="text-danger">{validateYear}</small>}
                </div>
            </form>
        </div>
    </>)
}

export default CrearPelicula