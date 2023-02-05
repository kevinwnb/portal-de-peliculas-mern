import $ from "jquery"
import { useEffect, useState } from "react"

const Buscar = (props) => {

    const [searchCriteria, setSearchCriteria] = useState("")

    useEffect(() => {
        if (searchCriteria.length >= 4)
            $(".buscador").animate({ top: "130px" }, 500)
    }, [searchCriteria])

    return (<>
        <div className="container contenido vh-100 d-flex align-items-center">
            <div className="d-flex justify-content-center w-100">
                <input placeholder="Buscar" className="buscador" onChange={(e) => setSearchCriteria(e.target.value)} type="text" />
            </div>
        </div>
    </>)
}

export default Buscar