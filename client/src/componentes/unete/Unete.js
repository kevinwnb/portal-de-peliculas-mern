import { useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import Activacion from "./Activacion"
import Formulario from "./Formulario"

const Unete = (props) => {

    useEffect(() => {
        props.setNav(false)
        props.setFooter(false)
    }, [])

    return (<>
        <div className="login-bg">
            <div className="container contenido register">
                <Routes>
                    <Route index element={<Formulario />} />
                    <Route path="/activate/:email" element={<Activacion />} />
                    <Route path="/activated" element={<div className="d-flex mx-auto flex-column bg-light">
                        <h6 className="h6">Tu cuenta ha sido verificada</h6>
                        <Link to="/login">Iniciar Sesión</Link>
                        </div>} />
                    <Route path="/*" element={<h6 className="h6">Not found</h6>} />
                </Routes>
            </div>
        </div>
    </>)
}

export default Unete