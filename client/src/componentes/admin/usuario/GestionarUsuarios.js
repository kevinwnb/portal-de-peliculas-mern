import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const GestionarUsuarios = props => {

    const [usuarios, setUsuarios] = useState()
    const [userIdToDelete, setUserIdToDelete] = useState("")

    useEffect(() => {
        fetch("/api/admin/usuario", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setUsuarios(data)
                console.log(usuarios)
            })
    }, [])

    const deleteUsuario = id => {
        fetch("/api/admin/usuario", {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + props.token,
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    return console.log(data.error)

                setUsuarios(usuarios.filter(u => u._id !== id))
                setUserIdToDelete("")
            })
    }

    const DeleteUsuarioModal = ({ id }) => {
        return (<div className="modal position-fixed" tabIndex="-1">
            <div>
                <button className="xclose" onClick={() => setUserIdToDelete("")}><i className="fa-solid fa-xmark"></i></button>
                <hr />
                <p>Realmente quieres eliminar?</p>
                <button className="btn btn-danger ms-auto d-flex" type="button" onClick={() => deleteUsuario(id)}>Eliminar</button>
            </div>
        </div>)
    }

    const renderUsuarios = usuarios => {
        switch (true) {
            case (usuarios && usuarios.length > 0):
                return (<div style={{ overflowX: "scroll" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Función</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u, index) => (<tr key={index}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <div className="d-flex flex-column">
                                        <Link className="btn btn-warning mb-2" to={"/admin/usuarios/editar/" + u._id}>Editar</Link>
                                        <button className="btn btn-danger" onClick={() => setUserIdToDelete(u._id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>)
                break;

            case !usuarios:
                return (<div className="loading-icon"></div>)

            default:
                return (<div className="alert alert-warning">No hay usuarios para mostrar</div>)
                break;
        }
    }

    return (<>
        {userIdToDelete && <DeleteUsuarioModal id={userIdToDelete} />}
        <div className="wrapper contenido gestionar-usuarios">
            <h6 className="display-6 text-center mb-5">Gestionar Usuarios</h6>
            {renderUsuarios(usuarios)}
        </div>
    </>)
}

export default GestionarUsuarios