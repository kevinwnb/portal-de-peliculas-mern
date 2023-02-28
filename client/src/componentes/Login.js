import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

function Login(props) {
    const [email, setEmail] = useState(Cookies.get("email") || "")
    const [password, setPassword] = useState(Cookies.get("password") || "")
    const [validateEmail, setValidateEmail] = useState("")
    const [recordarme, setRecordarme] = useState(Cookies.get("recordarme") === 'true' || false)
    const navigate = useNavigate()

    useEffect(() => {
        props.setNav(false)
        props.setFooter(false)

        console.log(JSON.stringify(Cookies.get()))

        return () => [props.setNav(true), props.setFooter(true)]
    }, [])

    const login = e => {
        e.preventDefault()
        setValidateEmail("")
        fetch("/api/login/login", {
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
                    return setValidateEmail(data.error)

                if (data.token) {
                    if (recordarme) {
                        if (!Cookies.get("email"))
                            Cookies.set("email", email)
                        if (!Cookies.get("password"))
                            Cookies.set("password", password)
                        if (!Cookies.get("recordarme"))
                            Cookies.set("recordarme", recordarme)
                    }
                    else {
                        Cookies.remove("email")
                        Cookies.remove("password")
                        Cookies.remove("recordarme")
                    }

                    props.setToken(data.token)
                    
                    return navigate("/inicio")
                }
            })
    }

    return <>
        <div className="login-bg">
            <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
                <form className="login-panel d-flex flex-column" onSubmit={e => login(e)}>
                    {validateEmail && <small className="text-danger">{validateEmail}</small>}
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="username" placeholder="email" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="password" placeholder="contraseña" />
                    <button type="submit" className="py-2">Login</button>
                    <span>
                        <input className="me-2" onChange={() => setRecordarme(!recordarme)} checked={recordarme} type="checkbox" id="recordarme" />
                        <label htmlFor="recordarme">Recordarme</label>
                    </span>
                    <Link to="/inicio">Inicio</Link>
                    <Link to="/unete">Únete</Link>
                </form>
            </div>
        </div>
    </>
}

export default Login