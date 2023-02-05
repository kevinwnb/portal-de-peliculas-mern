import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"

function Login(props) {
    const cookies = new Cookies()
    const [email, setEmail] = useState(cookies.get("email") || "")
    const [password, setPassword] = useState(cookies.get("password") || "")
    const [validateEmail, setValidateEmail] = useState("")
    const [recordarme, setRecordarme] = useState(cookies.get("recordarme") === 'true' || false)

    useEffect(() => {
        props.setNav(false)
        props.setFooter(false)

        console.log(JSON.stringify(cookies.getAll()))

        return () => [props.setNav(true), props.setFooter(true)]
    }, [])

    const login = e => {
        e.preventDefault()
        setValidateEmail("")
        fetch("/api/account/login", {
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
                        if (!cookies.get("email"))
                            cookies.set("email", email, {
                                path: "/login",
                                maxAge: 60 * 60 * 24 * 365
                            })

                        if (!cookies.get("password"))
                            cookies.set("password", password, {
                                path: "/login",
                                maxAge: 60 * 60 * 24 * 365
                            })

                        if (!cookies.get("recordarme"))
                            cookies.set("recordarme", recordarme, {
                                path: "/login",
                                maxAge: 60 * 60 * 24 * 365
                            })
                    }
                    else {
                        cookies.set("email", "", {
                            path: "/login",
                            maxAge: 0
                        })
                        cookies.set("password", "", {
                            path: "/login",
                            maxAge: 0
                        })
                        cookies.set("recordarme", "", {
                            path: "/login",
                            maxAge: 0
                        })
                    }

                    return props.setToken(data.token)
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