import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Formulario = () => {
    const [nombre, setNombre] = useState("")
    const [validateNombre, setValidateNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [validateApellidos, setValidateApellidos] = useState("")
    const [email, setEmail] = useState("")
    const [validateEmail, setValidateEmail] = useState("")
    const [pw, setPw] = useState("")
    const [validatePw, setValidatePw] = useState("")
    const [rpw, setRpw] = useState("")
    const [validateRpw, setValidateRpw] = useState("")
    const [info, setInfo] = useState("")
    const navigate = useNavigate()

    let send = e => {
        e.preventDefault()
        setValidateNombre("")
        setValidateApellidos("")
        setValidateEmail("")
        setValidatePw("")
        setValidateRpw("")
        setInfo("")

        let errors = 0
        if (!nombre) {
            errors++
            setValidateNombre("Nombre es requerido")
        }
        if (!apellidos) {
            errors++
            setValidateApellidos("Apellidos es requerido")
        }
        if (!email) {
            errors++
            setValidateEmail("Email es requerido")
        }
        if (!pw) {
            errors++
            setValidatePw("Contraseña es requerido")
        }
        if (!rpw) {
            errors++
            setValidateRpw("Repetir contraseña es requerido")
        }
        if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            errors++
            setValidateEmail("Email inválido")
        }

        if (pw != rpw) {
            errors++
            setValidatePw("Las contraseñas no coinciden")
            setValidateRpw("Las contraseñas no coinciden")
        }

        if (errors > 0)
            return


        fetch("/api/login/new", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                firstName: nombre,
                lastName: apellidos,
                email: email,
                password: pw
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return setInfo(data.error)
                if (!data.error) {
                    navigate("/unete/activate/" + email)
                }
            })
    }

    return (<form onSubmit={e => send(e)}>
        <h6 className="display-6 text-center mb-5">Únete</h6>

        {info && <p className="alert alert-info">{info}</p>}
        <div className="fn d-flex flex-column">
            <label htmlFor="fn" className={(validateNombre && "text-danger ")}>Nombre</label>
            <input className={"textbox " + (validateNombre && "border-danger ")} id="fn" onChange={e => setNombre(e.target.value)} type="text" />
            <small className="text-danger">{validateNombre}</small>
        </div>

        <div className="ln d-flex flex-column">
            <label htmlFor="ln" className={(validateApellidos && "text-danger ")}>Apellidos</label>
            <input className={"textbox " + (validateApellidos && "border-danger ")} id="ln" onChange={e => setApellidos(e.target.value)} type="text" />
            <small className="text-danger">{validateApellidos}</small>
        </div>

        <div className="em d-flex flex-column">
            <label htmlFor="em" className={(validateEmail && "text-danger ")}>Email</label>
            <input className={"textbox " + (validateEmail && "border-danger ")} id="em" onChange={e => setEmail(e.target.value)} type="text" />
            <small className="text-danger">{validateEmail}</small>
        </div>

        <div className="pw d-flex flex-column">
            <label htmlFor="pw" className={(validatePw && "text-danger ")}>Contraseña</label>
            <input className={"textbox " + (validatePw && "border-danger ")} id="pw" onChange={e => setPw(e.target.value)} type="text" />
            <small className="text-danger">{validatePw}</small>
        </div>

        <div className="rpw d-flex flex-column">
            <label htmlFor="rpw" className={(validateRpw && "text-danger ")}>Repetir Contraseña</label>
            <input className={"textbox " + (validateRpw && "border-danger ")} id="rpw" onChange={e => setRpw(e.target.value)} type="text" />
            <small className="text-danger">{validateRpw}</small>
        </div>

        <button type="submit">Finalizar</button>
    </form>)
}

export default Formulario