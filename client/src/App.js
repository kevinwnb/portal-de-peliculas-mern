import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Login from "./componentes/Login"
import Inicio from "./componentes/Inicio"
import Pelicula from "./componentes/Pelicula"
import Ver from "./componentes/Ver"
import Pie from "./componentes/Pie"
import Buscar from "./componentes/Buscar"
import Categorias from './componentes/Categorias';
import Unete from "./componentes/unete/Unete"
import "@fortawesome/fontawesome-free/css/all.min.css"

function App() {

  const [nav, setNav] = useState(true)
  const [footer, setFooter] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("token", token)
    if (token)
      navigate("/inicio")
    else
      navigate("/login")
  }, [token])

  return (
    <div className="App">
      {nav && <nav>
        <div className='container'>
          <ul>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink activeclassname="active" to="/inicio">Inicio</NavLink></li>
            <li><NavLink activeclassname="active" to="/categorias">Categorías</NavLink></li>
            <li><NavLink activeclassname="active" to="/buscar">Buscar</NavLink></li>
            <li className='ms-auto logout'><a href='#' onClick={() => setToken("")}>Salir <i className="fa-solid fa-arrow-right-from-bracket"></i></a></li>
          </ul>
        </div>
      </nav>}
      <main>
        <Routes>
          <Route path='/login' element={<Login token={token} setToken={setToken} setFooter={setFooter} setNav={setNav} />} />
          <Route path='/inicio' element={(token ? <Inicio token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/pelicula/:id' element={(token ? <Pelicula token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/pelicula/:id/ver' element={(token ? <Ver token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/buscar' element={(token ? <Buscar token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/categorias' element={(token ? <Categorias token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/unete/*' element={<Unete setNav={setNav} setFooter={setFooter} />} />
        </Routes>
      </main>
      {footer && <footer className='mt-5'>
        <Pie />
      </footer>}
    </div>
  );
}

export default App;