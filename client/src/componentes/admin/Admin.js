import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"


const Admin = (props) => {
    const [token, setToken] = useState(Cookies.get("admin-token") || "")

    useEffect(() => {
        props.setNav(false)
        props.setFooter(false)
        console.log(Cookies.get("admin-token"))
    }, [])

    return (<>
        <Routes>
            <Route path="/login" element={(token ? <Navigate to="/admin/dashboard" replace={true} /> : <Login token={token} setToken={setToken} />)} />
            <Route path="/dashboard" element={(token ? <Dashboard /> : <Navigate to="/admin/login" replace={true} />)} />
            <Route path="*" element={<Navigate to="/admin/login" replace={true} />} />
        </Routes>
    </>)
}

export default Admin