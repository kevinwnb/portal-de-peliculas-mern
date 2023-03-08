import { useState } from "react"


const CrearUsuario = props => {

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
    const [successMessage, setSuccessMessage] = useState("")

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

        if (!password) {
            errors++
            setPwValidation("Contraseña es requerida")
        }

        if (!repeatPassword) {
            errors++
            setRpwValidation("Repetir contraseña es requerido")
        }

        if ((password || repeatPassword) && password !== repeatPassword) {
            errors++
            setPwValidation("Las contraseñas no coinciden")
            setRpwValidation("Las contraseñas no coinciden")
        }

        if (errors === 0) {
            fetch("/api/admin/usuario", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + props.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error)
                        return console.log(data.error)

                    resetForm()
                    setSuccessMessage(data.msg)
                })
        }
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
        <div className="wrapper contenido crear-usuario usuarios">
            <form onSubmit={e => submit(e)}>
                <h6 className="display-6 text-center mb-5">Crear Administrador</h6>
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
                    <input className="input" type="text" readOnly={true} value="Administrador" />
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
                    <button type="submit">CREAR USUARIO</button>
                </div>
            </form>
        </div>
    </>)
}

export default CrearUsuario