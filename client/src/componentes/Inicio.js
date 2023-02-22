import { Link } from "react-router-dom"
import Bodas from "./imagenes/catalogo/bodas.png"
import Bullet from "./imagenes/catalogo/bullet.png"
import Fast from "./imagenes/catalogo/fast.png"
import FreeGuy from "./imagenes/catalogo/free guy.png"
import Marea from "./imagenes/catalogo/marea.png"
import Menu from "./imagenes/catalogo/menu.png"
import Mortadelo from "./imagenes/catalogo/mortadelo.png"
import Policias from "./imagenes/catalogo/policias.png"
import Rampage from "./imagenes/catalogo/rampage.png"
import Smile from "./imagenes/catalogo/smile.png"
import Venus from "./imagenes/catalogo/venus.png"
import Wakanda from "./imagenes/catalogo/wakanda.png"

function Inicio(props) {

    return (<>
        <div className='contenido'>
            <div className="container">
                <h6 className="titulo-apartado text-center text-md-start display-6">Favoritas</h6>
                <div className="favoritas d-flex flex-wrap">
                    <div>
                        <Link to="/pelicula/1">
                            <div>
                            <h5 className="stars">+++++</h5>
                                <img src={Bodas} />
                                <h5>Bodas</h5>
                            </div>
                        </Link>
                    </div>
                    <div><div><img src={Bullet} /><h5>Bullet</h5></div></div>
                    <div><div><img src={Fast} /><h5>Fast</h5></div></div>
                    <div><div><img src={FreeGuy} /><h5>Free Guy</h5></div></div>
                </div>
                <h6 className="titulo-apartado display-6 mt-5">Recomendaciones</h6>
                <div className="favoritas d-flex flex-wrap">
                    <div><div><img src={Marea} /><h5>Marea</h5></div></div>
                    <div><div><img src={Menu} /><h5>Menu</h5></div></div>
                    <div><div><img src={Mortadelo} /><h5>Mortadelo</h5></div></div>
                    <div><div><img src={Policias} /><h5>Policias</h5></div></div>
                </div>
                <h6 className="titulo-apartado display-6 mt-5">Populares</h6>
                <div className="favoritas d-flex flex-wrap">
                    <div><div><img src={Rampage} /><h5>Rampage</h5></div></div>
                    <div><div><img src={Smile} /><h5>Smile</h5></div></div>
                    <div><div><img src={Venus} /><h5>Venus</h5></div></div>
                    <div><div><img src={Wakanda} /><h5>Wakanda</h5></div></div>
                </div>
                <h6 className="titulo-apartado display-6 mt-5">Más Películas</h6>
                <div className="favoritas d-flex flex-wrap">
                    <div>
                        <Link to="/pelicula/1">
                            <div>
                            <h5 className="stars">+++++</h5>
                                <img src={Bodas} />
                                <h5>Bodas</h5>
                            </div>
                        </Link>
                    </div>
                    <div><div><img src={Bullet} /><h5>Bullet</h5></div></div>
                    <div><div><img src={Fast} /><h5>Fast</h5></div></div>
                    <div><div><img src={FreeGuy} /><h5>Free Guy</h5></div></div>
                    <div><div><img src={Marea} /><h5>Marea</h5></div></div>
                    <div><div><img src={Menu} /><h5>Menu</h5></div></div>
                    <div><div><img src={Mortadelo} /><h5>Mortadelo</h5></div></div>
                    <div><div><img src={Policias} /><h5>Policias</h5></div></div>
                    <div><div><img src={Rampage} /><h5>Rampage</h5></div></div>
                    <div><div><img src={Smile} /><h5>Smile</h5></div></div>
                    <div><div><img src={Venus} /><h5>Venus</h5></div></div>
                    <div><div><img src={Wakanda} /><h5>Wakanda</h5></div></div>
                </div>
            </div>
        </div>
    </>)
}

export default Inicio