import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"



const Login = (props) => {
    const [validation, setValidation] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = e => {
        e.preventDefault()
        setValidation("")
        fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return setValidation(data.error)

                if (data.token) {
                    props.setToken(data.token)
                    Cookies.remove("admin-token")
                    Cookies.set("admin-token", data.token)

                    return navigate("/admin/dashboard", { replace: true })
                }
            })
    }

    return (
        <div className="admin admin-bg d-flex w-100 vh-100 justify-content-center align-items-center">
            <form className="login-panel d-flex flex-column" onSubmit={e => login(e)}>
                <h6 className="display-6 mb-5">Área administrativa</h6>
                {validation && <small className="text-danger">{validation}</small>}
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="input email mb-2" placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="password" placeholder="contraseña" />
                <button type="submit" className="py-2">Login</button>
            </form>
        </div>
    )
}

export default Login