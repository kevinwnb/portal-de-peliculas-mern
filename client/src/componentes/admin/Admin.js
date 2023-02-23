import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"


const Admin = (props) => {
    const [token, setToken] = useState(Cookies.get("admin-token") || "")

    useEffect(()=>{
        props.setNav(false)
        props.setFooter(false)
    },[])

    return (<>
        <Routes>
            <Route path="/login" element={(token ? <Navigate to="/admin/dashboard" replace={true} /> : <Login token={token} setToken={setToken} />)} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </>)
}

export default Admin