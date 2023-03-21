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
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="textbox username" placeholder="email" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="textbox password" placeholder="contraseña" />
                    <button type="submit">Login</button>
                    <div className="chk-container">
                        <div className="cntr">
                            <label htmlFor="cbx" className="label-cbx">
                                <input onChange={() => setRecordarme(!recordarme)} checked={recordarme} id="cbx" type="checkbox" className="invisible" />
                                <div className="checkbox">
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
                                        <polyline points="4 11 8 15 16 6" />
                                    </svg>
                                </div>
                                <span>Recordarme</span>
                            </label>
                        </div>
                    </div>
                    <span className="mt-3 unete"><h6>No tienes cuenta?</h6> <Link className="link link-light" to="/unete">Únete</Link></span>
                </form>
            </div>
        </div>
    </>
}

export default Login