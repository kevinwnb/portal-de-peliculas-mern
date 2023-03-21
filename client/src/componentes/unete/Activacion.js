import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"


const Activacion = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [code, setCode] = useState(0)
    const [validateCode, setValidateCode] = useState("")

    const verify = e => {
        e.preventDefault()
        setValidateCode("")
        fetch("/api/login/activate", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: params.email, activationCode: code })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return setValidateCode(data.error)

                if (data.success) {
                    navigate("/unete/activated")
                }
            })
    }

    const resendVerificationCode = () => {
        fetch("/api/login/activate/resend", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: params.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return setValidateCode(data.error)

                if (data.verified)
                    navigate("/unete/activated")
            })
    }

    return (<form onSubmit={e => verify(e)}>
        <div className="verification-code d-flex flex-column">
            <h6 className="display-6 text-center mb-5">Verificación</h6>
            <label htmlFor="v-code">Escribe el código de verificación enviado a tu email</label>
            <input id="v-code" className="textbox" onChange={e => setCode(e.target.value)} />
            {validateCode && <small className="text-danger">{validateCode}</small>}
            <button className="my-3" type="submit">Activar</button>
            <button type="button" onClick={() => resendVerificationCode()} className="btn btn-link link-light">Reenviar</button>
        </div>
    </form>)
}

export default Activacion