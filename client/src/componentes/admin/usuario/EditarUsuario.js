



import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


const EditarUsuario = props => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [firstNameValidation, setFirstNameValidation] = useState("")
    const [lastNameValidation, setLastNameValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [pwValidation, setPwValidation] = useState("")
    const [rpwValidation, setRpwValidation] = useState("")
    const [role, setRole] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const params = useParams()

    useEffect(() => {
        getUsuario(params.id)
    }, [])

    const submit = e => {
        e.preventDefault()

        let errors = 0

        if (!firstName) {
            errors++
            setFirstNameValidation("Nombre es requerido")
        }

        if (!lastName) {
            errors++
            setLastNameValidation("Apellido es requerido")
        }

        if (!email) {
            errors++
            setEmailValidation("Email es requerido")
        }

        if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            errors++
            setEmailValidation("Formato de email inválido")
        }

        if ((password || repeatPassword) && password !== repeatPassword) {
            errors++
            setPwValidation("Las contraseñas no coinciden")
            setRpwValidation("Las contraseñas no coinciden")
        }

        if (errors === 0) {
            fetch("/api/admin/usuario", {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + props.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    id:params.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    ...(password && { password: password })
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error)
                        return console.log(data.error)

                    setSuccessMessage(data.msg)
                })
        }
    }

    const getUsuario = id => {
        fetch("/api/admin/usuario/" + params.id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setFirstName(data.firstName)
                setLastName(data.lastName)
                setEmail(data.email)
                setRole(data.role)
                setSuccessMessage(data.msg)
            })
    }

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
        setFirstNameValidation("")
        setLastNameValidation("")
        setEmailValidation("")
        setPwValidation("")
        setRpwValidation("")
    }

    return (<>
        <div className="wrapper contenido editar-usuario usuarios">
            <form onSubmit={e => submit(e)}>
                <h6 className="display-6">Editar Usuario</h6>
                {successMessage && (<p className="alert alert-success">{successMessage}</p>)}
                <div className="grupo">
                    <label htmlFor="firstName">Nombre</label>
                    <input value={firstName} className="input" type="text" id="firstName" onChange={e => setFirstName(e.target.value)} />
                    {firstNameValidation && (<small className="text-danger">{firstNameValidation}</small>)}
                </div>
                <div className="grupo">
                    <label htmlFor="lastName">Apellido</label>
                    <input value={lastName} className="input" type="text" id="lastName" onChange={e => setLastName(e.target.value)} />
                    {lastNameValidation && (<small className="text-danger">{lastNameValidation}</small>)}
                </div>
                <div className="grupo">
                    <label htmlFor="email">Email</label>
                    <input value={email} className="input" type="text" id="email" onChange={e => setEmail(e.target.value)} />
                    {emailValidation && (<small className="text-danger">{emailValidation}</small>)}
                </div>
                <div className="grupo">
                    <label>Función</label>
                    <input className="input" type="text" readOnly={true} value={role} />
                </div>
                <div className="grupo">
                    <label htmlFor="password">Contraseña</label>
                    <input value={password} className="input" type="password" id="password" onChange={e => setPassword(e.target.value)} />
                    {pwValidation && (<small className="text-danger">{pwValidation}</small>)}
                </div>
                <div className="grupo">
                    <label htmlFor="repeatPassword">Repetir Contraseña</label>
                    <input value={repeatPassword} className="input" type="password" id="repeatPassword" onChange={e => setRepeatPassword(e.target.value)} />
                    {rpwValidation && (<small className="text-danger">{rpwValidation}</small>)}
                </div>
                <div className="grupo">
                    <button type="submit">GUARDAR CAMBIOS</button>
                </div>
            </form>
        </div>
    </>)
}

export default EditarUsuario