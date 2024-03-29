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
import $ from "jquery"
import Admin from './componentes/admin/Admin';
import Estrenos from './componentes/Estrenos';

function App() {

  const [nav, setNav] = useState(true)
  const [footer, setFooter] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const navigate = useNavigate()

  let genres = "acción;aventuras;comedia;drama;documental;familiar;fantasía;terror;romance;ciencia ficción;suspense;anime;guerra;deportes;crimen"

  genres = genres.split(";")

  //genres.sort((a, b) => a.localeCompare(b))

  useEffect(() => {
    document.title = 'Portal de películas'
  }, [])

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  let st = 0

  const openMenu = () => {
    st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    let scrollTop = "-" + st + "px"
    document.querySelector("body").classList.add("lock-scroll")
    $("body").css({ top: scrollTop })
    $(".hamburger-menu").animate({ left: "0px" }, 300)
  }

  const closeMenu = () => {
    $(".hamburger-menu").animate({ left: "-320px" }, 300, function () {
      document.querySelector("body").classList.remove("lock-scroll")
      window.scrollTo({ top: st, behavior: "instant" })
    })
  }

  const logout = () => {
    $(".hamburger-menu").animate({ left: "-320px" }, 300, function () {
      document.querySelector("body").classList.remove("lock-scroll")
      window.scrollTo({ top: st, behavior: "instant" })
      setToken("")
    })
  }

  const renderNav = () => {
    const currentPath = window.location.pathname
    const disablePathList = [
      "/admin/login",
      "/admin"
    ]
    switch (true) {
      case (!disablePathList.includes(currentPath)):
        return (<>
          <div className='hamburger-menu'>
            <ul>
              <li className='ms-auto mb-5'><button className='xclose' onClick={() => closeMenu()}><i className="fa-solid fa-xmark"></i></button></li>
              <li><NavLink to="/inicio"><i className="fa-solid fa-house"></i> <span>Inicio</span></NavLink></li>
              <li><NavLink to="/generos"><i className="fa-solid fa-list"></i> <span>Generos</span></NavLink></li>
              <li><NavLink to="/estrenos"><i className="fa-solid fa-film"></i> <span>Estrenos</span></NavLink></li>
              <li><NavLink to="/buscar"><i className="fa-solid fa-magnifying-glass"></i> <span>Búsqueda</span></NavLink></li>
              <li className='logout'><a href="" onClick={(e) => { e.preventDefault(); logout() }}><i className="fa-solid fa-arrow-right-from-bracket"></i> <span>Salir</span></a></li>
            </ul>
          </div>
          <nav>
            <ul>
              <li className='hamburger'><button onClick={() => openMenu()}><i className="fa-solid fa-bars"></i></button></li>
              <li><NavLink activeclassname="active" to="/inicio"><i className="fa-solid fa-house"></i> Inicio</NavLink></li>
              <li><NavLink activeclassname="active" to="/generos"><i className="fa-solid fa-list"></i> Géneros</NavLink></li>
              <li><NavLink activeclassname="active" to="/estrenos"><i className="fa-solid fa-film"></i> Estrenos</NavLink></li>
              <li><NavLink activeclassname="active" to="/buscar"><i className="fa-solid fa-magnifying-glass"></i> Búsqueda</NavLink></li>
              <li className='logout'><a href='#' onClick={() => setToken("")}>Salir <i className="fa-solid fa-arrow-right-from-bracket"></i></a></li>
            </ul>
          </nav>
        </>)
        break;

      default:
        return null
        break;
    }
  }

  return (
    <div className="App">
      {nav && renderNav()}
      <main>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace={true} />}></Route>
          <Route path='/login' element={<Login token={token} setToken={setToken} setFooter={setFooter} setNav={setNav} />} />
          <Route path='/inicio' element={(token ? <Inicio token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/pelicula/:id' element={(token ? <Pelicula token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/pelicula/:id/ver' element={(token ? <Ver token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/buscar' element={(token ? <Buscar token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/generos' element={(token ? <Categorias token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/estrenos' element={(token ? <Estrenos token={token} /> : <Navigate to="/login" replace={true} />)} />
          <Route path='/unete/*' element={<Unete setNav={setNav} setFooter={setFooter} />} />
          <Route path='/admin/*' element={<Admin genres={genres} setNav={setNav} setFooter={setFooter} />} />
        </Routes>
      </main>
      {footer && <footer className='mt-5'>
        <Pie />
      </footer>}
    </div>
  );
}

export default App;
